const express = require('express');
const { randomUUID } = require('crypto');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
require('dotenv').config();

const { query, getClient } = require('./db');
const { signUser, requireAuth, requireRole } = require('./auth');
const { UPLOADS_DIR, PhotoValidationError, ensureUploadsDir, writeProfilePhoto, discardProfilePhoto, pruneProfilePhotos, removeProfilePhoto } = require('./photos');
const { ensureProfilePhotoColumn, ensureQuestActivityType, ensurePetNameColumn, ensureStudentActivities } = require('./schema');
const { dailyQuests } = require('./quests');
const { generatePracticeQuestions } = require('./practice');

const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = (process.env.FRONTEND_ORIGIN || '').split(',').map((value) => value.trim()).filter(Boolean);

app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true, credentials: true }));
app.use(express.json({ limit: '6mb' }));

ensureUploadsDir();
app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '7d', index: false }));

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false });
const DEFAULT_STUDENT_PASSWORD = '12345';

const loginSchema = z.object({ username: z.string().trim().min(1).max(80), password: z.string().min(1).max(120) });
const studentSchema = z.object({ fullName: z.string().trim().min(2).max(120), nis: z.string().trim().min(1).max(40), grade: z.string().trim().min(1).max(30), className: z.string().trim().min(1).max(80), levelId: z.coerce.number().int().positive(), language: z.enum(['id-ID', 'en-US']).default('id-ID') });
const studentUpdateSchema = studentSchema.partial().extend({ password: z.string().min(4).max(120).optional() });
const profileSchema = z.object({ fullName: z.string().trim().min(2).max(120).optional(), language: z.enum(['id-ID', 'en-US']).optional(), photo: z.union([z.string().min(1).max(4000000), z.null()]).optional() }).refine((value) => value.fullName !== undefined || value.language !== undefined || value.photo !== undefined, { message: 'No profile field to update' });
const passwordChangeSchema = z.object({ currentPassword: z.string().min(1).max(120), newPassword: z.string().min(4).max(120) });
const learningActivitySchema = z.object({ lessonKey: z.string().trim().min(1).max(100) });

function sendValidationError(res, error) { const details = error.issues?.map((issue) => `${issue.path.join('.') || 'request'}: ${issue.message}`).join('; '); return res.status(400).json({ message: details ? `Invalid request data: ${details}` : 'Invalid request data', issues: error.issues }); }
function toPublicUser(row) {
  return { id: row.id, fullName: row.full_name, username: row.username, role: row.role, levelId: row.level_id, levelName: row.level_name || null, language: row.language, photoUrl: row.photo_url || null, profile: row.nis ? { nis: row.nis, grade: row.grade, classId: row.class_id, className: row.class_name, currentExp: row.current_exp, currentStreak: row.current_streak, petType: row.pet_type || 'egg', petName: row.pet_name || null, onboardingCompleted: row.onboarding_completed } : null };
}
function dateKeyFor(timestamp = Date.now()) { return new Date(timestamp).toISOString().slice(0, 10); }
function streakFromDates(dates) {
  const todayKey = dateKeyFor();
  const yesterdayKey = dateKeyFor(Date.now() - 86400000);
  const set = new Set(dates);
  let cursor = set.has(todayKey) ? todayKey : (set.has(yesterdayKey) ? yesterdayKey : null);
  let streak = 0;
  while (cursor) {
    streak += 1;
    const previous = new Date(`${cursor}T00:00:00Z`); previous.setUTCDate(previous.getUTCDate() - 1);
    cursor = set.has(previous.toISOString().slice(0, 10)) ? previous.toISOString().slice(0, 10) : null;
  }
  return streak;
}
async function runStatement(executor, sql, params = []) {
  if (typeof executor === 'function') return executor(sql, params);
  return executor.query(sql, params);
}
async function liveStreak(userId, client = query) {
  const result = await runStatement(client, "SELECT DISTINCT activity_key FROM student_activities WHERE user_id = $1 AND activity_type = 'checkin'", [userId]);
  return streakFromDates((result.rows || []).map((row) => row.activity_key));
}
async function syncStreak(userId, client = query) {
  const streak = await liveStreak(userId, client);
  await runStatement(client, 'UPDATE student_profiles SET current_streak = $1 WHERE user_id = $2', [streak, userId]);
  return streak;
}

app.get('/api/health', async (req, res) => {
  try { await query('SELECT 1'); return res.json({ status: 'ok', service: 'logical-api', database: 'connected', timestamp: new Date().toISOString() }); }
  catch { return res.status(503).json({ status: 'degraded', service: 'logical-api', database: 'unavailable', message: 'Database connection is not available' }); }
});
app.get('/api/config', (req, res) => res.json({ supportedLanguages: ['id-ID', 'en-US'], roles: ['teacher', 'student'], ai: { provider: 'groq', clientAccessible: false } }));

const userQuery = `SELECT u.*, l.name AS level_name, sp.nis, sp.grade, sp.class_id, c.name AS class_name, sp.current_exp, sp.current_streak, sp.pet_type, sp.pet_name, sp.onboarding_completed FROM users u LEFT JOIN levels l ON l.id = u.level_id LEFT JOIN student_profiles sp ON sp.user_id = u.id LEFT JOIN classes c ON c.id = sp.class_id`;

app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return sendValidationError(res, parsed.error);
  if (!process.env.JWT_SECRET) return res.status(503).json({ message: 'Authentication is not configured. Set JWT_SECRET in backend/.env.' });
  try {
    const result = await query(`${userQuery} WHERE u.username = $1 AND u.is_active = TRUE`, [parsed.data.username]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(parsed.data.password, user.password_hash))) return res.status(401).json({ message: 'Username or password is incorrect' });
    return res.json({ token: signUser(user), user: toPublicUser(user) });
  } catch (error) { console.error('Login error:', error.message); return res.status(503).json({ message: 'Unable to connect to the database' }); }
});
app.post('/api/auth/logout', requireAuth, (req, res) => res.json({ message: 'Logged out successfully' }));
app.get('/api/auth/me', requireAuth, async (req, res) => {
  try { const result = await query(`${userQuery} WHERE u.id = $1 AND u.is_active = TRUE`, [req.auth.sub]); if (!result.rows[0]) return res.status(404).json({ message: 'User not found' }); if (result.rows[0].role === 'student') result.rows[0].current_streak = await syncStreak(req.auth.sub); return res.json({ user: toPublicUser(result.rows[0]) }); }
  catch { return res.status(503).json({ message: 'Unable to connect to the database' }); }
});

async function updateProfileRow(userId, fields) {
  const columns = Object.keys(fields);
  if (!columns.length) return null;
  const sql = `UPDATE users SET ${columns.map((column, index) => `${column} = $${index + 1}`).join(', ')} WHERE id = $${columns.length + 1}`;
  const values = [...columns.map((column) => fields[column]), userId];
  try { return await query(sql, values); }
  catch (error) {
    if (error.code !== 'ER_BAD_FIELD_ERROR') throw error;
    await ensureProfilePhotoColumn();
    return query(sql, values);
  }
}

app.put('/api/profile', requireAuth, async (req, res) => {
  const parsed = profileSchema.safeParse(req.body); if (!parsed.success) return sendValidationError(res, parsed.error);
  const data = parsed.data; const hasPhoto = Object.prototype.hasOwnProperty.call(req.body, 'photo');
  const wantsPhoto = hasPhoto && Boolean(data.photo);
  const wantsRemove = hasPhoto && !data.photo;
  let staged = null;
  try {
    if (wantsPhoto) staged = writeProfilePhoto(req.auth.sub, data.photo);
    const fields = {};
    if (data.fullName !== undefined) fields.full_name = data.fullName;
    if (data.language !== undefined) fields.language = data.language;
    if (wantsPhoto) fields.photo_url = staged.url;
    if (wantsRemove) fields.photo_url = null;
    await updateProfileRow(req.auth.sub, fields);
    if (staged) pruneProfilePhotos(req.auth.sub, staged.fileName);
    if (wantsRemove) removeProfilePhoto(req.auth.sub);
    const result = await query(`${userQuery} WHERE u.id = $1`, [req.auth.sub]); return res.json({ user: toPublicUser(result.rows[0]) });
  } catch (error) {
    if (staged) discardProfilePhoto(staged.fileName);
    if (error instanceof PhotoValidationError) return res.status(400).json({ message: error.message });
    console.error('Save profile error:', error.code || '', error.message);
    if (error.code === 'ER_BAD_FIELD_ERROR') return res.status(503).json({ message: 'Database schema is outdated (users.photo_url is missing). Run "npm run migrate" in the backend folder, then try again.' });
    if (error.code && ['EACCES', 'EPERM', 'EROFS', 'ENOSPC', 'ENOENT'].includes(error.code)) return res.status(503).json({ message: `Server cannot write the photo folder: ${error.message}` });
    const reason = String(error.message || '').slice(0, 200);
    return res.status(503).json({ message: reason ? `Unable to save profile: ${reason}` : 'Unable to save profile' });
  }
});

app.put('/api/profile/password', requireAuth, async (req, res) => {
  const parsed = passwordChangeSchema.safeParse(req.body); if (!parsed.success) return sendValidationError(res, parsed.error);
  const { currentPassword, newPassword } = parsed.data;
  if (currentPassword === newPassword) return res.status(400).json({ message: 'New password must be different from the current password' });
  try {
    const result = await query('SELECT password_hash FROM users WHERE id = $1 AND is_active = TRUE', [req.auth.sub]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!(await bcrypt.compare(currentPassword, user.password_hash))) return res.status(400).json({ message: 'Current password is incorrect' });
    await query('UPDATE users SET password_hash = $1 WHERE id = $2', [await bcrypt.hash(newPassword, 12), req.auth.sub]);
    return res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error.code || '', error.message);
    return res.status(503).json({ message: `Unable to change password: ${String(error.message || '').slice(0, 200)}` });
  }
});
app.put('/api/student/onboarding', requireAuth, requireRole('student'), async (req, res) => {
  const petSchema = z.object({ pet: z.enum(['egg', 'cat', 'dog', 'fox', 'bird']).default('egg'), petName: z.string().trim().min(1).max(40).optional() });
  const parsed = petSchema.safeParse(req.body); if (!parsed.success) return sendValidationError(res, parsed.error);
  try { await query('UPDATE student_profiles SET pet_type = CASE WHEN onboarding_completed = TRUE THEN pet_type ELSE $1 END, pet_name = COALESCE($2, pet_name), onboarding_completed = TRUE WHERE user_id = $3', [parsed.data.pet, parsed.data.petName || null, req.auth.sub]); const result = await query(`${userQuery} WHERE u.id = $1`, [req.auth.sub]); const finalPet = result.rows[0]?.pet_type || parsed.data.pet; return res.json({ user: toPublicUser(result.rows[0]), pet: finalPet, locked: true }); }
  catch { return res.status(503).json({ message: 'Unable to complete onboarding' }); }
});
app.get('/api/student/pet', requireAuth, requireRole('student'), async (req, res) => {
  try {
    const result = await query(`${userQuery} WHERE u.id = $1 AND u.is_active = TRUE`, [req.auth.sub]);
    if (!result.rows[0]) return res.status(404).json({ message: 'Student not found' });
    const user = toPublicUser(result.rows[0]); const exp = user.profile?.currentExp || 0;
    const streak = await syncStreak(req.auth.sub);
    return res.json({ pet: user.profile?.petType || 'egg', petName: user.profile?.petName || null, level: Math.floor(exp / 100), exp, expInLevel: exp % 100, expToNextLevel: 100, streak, onboardingCompleted: Boolean(user.profile?.onboardingCompleted) });
  } catch (error) { console.error('Load pet progress error:', error.message); return res.status(503).json({ message: 'Unable to load pet progress' }); }
});
app.put('/api/student/pet/name', requireAuth, requireRole('student'), async (req, res) => {
  const petNameSchema = z.object({ petName: z.string().trim().min(1).max(40) });
  const parsed = petNameSchema.safeParse(req.body); if (!parsed.success) return sendValidationError(res, parsed.error);
  try { await query('UPDATE student_profiles SET pet_name = $1 WHERE user_id = $2', [parsed.data.petName, req.auth.sub]); const result = await query(`${userQuery} WHERE u.id = $1`, [req.auth.sub]); return res.json({ user: toPublicUser(result.rows[0]) }); }
  catch (error) { console.error('Rename pet error:', error.message); return res.status(503).json({ message: 'Unable to rename the pet' }); }
});
app.get('/api/student/activities', requireAuth, requireRole('student'), async (req, res) => {
  try {
    const result = await query('SELECT activity_type, activity_key FROM student_activities WHERE user_id = $1', [req.auth.sub]);
    const dateKey = new Date().toISOString().slice(0, 10);
    const lessonKeyOf = (key) => key.split(':')[0];
    const completedLessons = [...new Set(result.rows.filter((row) => row.activity_type === 'learning').map((row) => lessonKeyOf(row.activity_key)))];
    const todayLessonKeys = result.rows.filter((row) => row.activity_type === 'learning' && row.activity_key.endsWith(`:${dateKey}`)).map((row) => lessonKeyOf(row.activity_key));
    const checkedInToday = result.rows.some((row) => row.activity_type === 'checkin' && row.activity_key === dateKey);
    return res.json({ completedLessons, todayLessonKeys, lessonsToday: todayLessonKeys.length, checkedInToday });
  } catch (error) { console.error('Load activities error:', error.message); return res.status(503).json({ message: 'Unable to load activity progress' }); }
});
app.post('/api/student/practice/generate', requireAuth, requireRole('student'), async (req, res) => {
  const practiceSchema = z.object({
    lessonKey: z.string().trim().min(1).max(100).optional().default(''),
    operation: z.enum(['addition', 'subtraction', 'mixed', 'story']).default('addition'),
    max: z.coerce.number().int().min(3).max(20).optional(),
    count: z.coerce.number().int().min(1).max(8).optional().default(4),
  });
  const parsed = practiceSchema.safeParse(req.body); if (!parsed.success) return sendValidationError(res, parsed.error);
  try {
    const questions = await generatePracticeQuestions({ lessonKey: parsed.data.lessonKey, operation: parsed.data.operation, max: parsed.data.max, count: parsed.data.count });
    return res.json({ questions });
  } catch (error) { console.error('Practice generate error:', error.message); return res.status(503).json({ message: 'Unable to generate practice questions' }); }
});
app.post('/api/student/activity/complete', requireAuth, requireRole('student'), async (req, res) => {
  const parsed = learningActivitySchema.safeParse(req.body); if (!parsed.success) return sendValidationError(res, parsed.error);
  const client = await getClient(); const dateKey = dateKeyFor(); const activityKey = `${parsed.data.lessonKey}:${dateKey}`;
  try {
    await client.query('BEGIN');
    const learning = await client.query("INSERT IGNORE INTO student_activities (id, user_id, activity_type, activity_key, points) VALUES ($1, $2, 'learning', $3, 5)", [randomUUID(), req.auth.sub, activityKey]);
    let learningAwarded = learning.rowCount > 0 ? 5 : 0;
    if (learningAwarded) await client.query('UPDATE student_profiles SET current_exp = current_exp + 5 WHERE user_id = $1', [req.auth.sub]);
    const activityRows = await client.query("SELECT activity_type, activity_key FROM student_activities WHERE user_id = $1", [req.auth.sub]);
    const todayLessonKeys = activityRows.rows.filter((row) => row.activity_type === 'learning' && row.activity_key.endsWith(`:${dateKey}`)).map((row) => row.activity_key.split(':')[0]);
    const progress = { lessonsToday: todayLessonKeys.length, todayLessonKeys, checkedInToday: activityRows.rows.some((row) => row.activity_type === 'checkin' && row.activity_key === dateKey) };
    let questAwarded = 0; const questsCompleted = [];
    for (const quest of dailyQuests()) {
      if (quest.measure(progress) < quest.target) continue;
      const awarded = await client.query("INSERT IGNORE INTO student_activities (id, user_id, activity_type, activity_key, points) VALUES ($1, $2, 'quest', $3, $4)", [randomUUID(), req.auth.sub, `${quest.id}:${dateKey}`, quest.reward]);
      if (awarded.rowCount > 0) { questAwarded += quest.reward; questsCompleted.push(quest.id); }
    }
    if (questAwarded) await client.query('UPDATE student_profiles SET current_exp = current_exp + $1 WHERE user_id = $2', [questAwarded, req.auth.sub]);
    let checkinAwarded = 0;
    if (questsCompleted.length) {
      const checkin = await client.query("INSERT IGNORE INTO student_activities (id, user_id, activity_type, activity_key, points) VALUES ($1, $2, 'checkin', $3, 10)", [randomUUID(), req.auth.sub, dateKey]);
      checkinAwarded = checkin.rowCount > 0 ? 10 : 0;
      if (checkinAwarded) await client.query('UPDATE student_profiles SET current_exp = current_exp + 10 WHERE user_id = $1', [req.auth.sub]);
    }
    await syncStreak(req.auth.sub, client);
    await client.query('COMMIT');
    const result = await query(`${userQuery} WHERE u.id = $1`, [req.auth.sub]); const user = toPublicUser(result.rows[0]); const exp = user.profile?.currentExp || 0;
    return res.json({ message: 'Learning activity recorded', user, learningAwarded, checkinAwarded, questAwarded, questsCompleted, totalAwarded: learningAwarded + checkinAwarded + questAwarded, level: Math.floor(exp / 100), exp, expInLevel: exp % 100, expToNextLevel: 100, streak: user.profile?.currentStreak || 0 });
  } catch (error) { await client.query('ROLLBACK'); console.error('Complete activity error:', error.message); return res.status(400).json({ message: 'Unable to record learning activity' }); } finally { client.release(); }
});
app.get('/api/levels', requireAuth, async (req, res) => { try { return res.json({ levels: (await query('SELECT id, name, description FROM levels ORDER BY id')).rows }); } catch { return res.status(503).json({ message: 'Unable to load levels' }); } });
app.get('/api/classes', requireAuth, requireRole('teacher'), async (req, res) => { try { return res.json({ classes: (await query('SELECT id, name, grade FROM classes WHERE teacher_id = $1 ORDER BY grade, name', [req.auth.sub])).rows }); } catch { return res.status(503).json({ message: 'Unable to load classes' }); } });

app.get('/api/teacher/analytics', requireAuth, requireRole('teacher'), async (req, res) => {
  try {
    const studentsResult = await query(`SELECT u.id, u.full_name, sp.grade, c.name AS class_name, sp.current_exp, sp.current_streak FROM users u JOIN student_profiles sp ON sp.user_id = u.id LEFT JOIN classes c ON c.id = sp.class_id WHERE sp.teacher_id = $1 AND u.is_active = TRUE ORDER BY u.full_name`, [req.auth.sub]);
    const activityResult = await query(`SELECT sa.user_id, sa.activity_type, sa.activity_key, sa.created_at FROM student_activities sa JOIN student_profiles sp ON sp.user_id = sa.user_id WHERE sp.teacher_id = $1`, [req.auth.sub]);
    const todayKey = dateKeyFor();
    const byStudent = new Map();
    for (const row of activityResult.rows) {
      if (!byStudent.has(row.user_id)) byStudent.set(row.user_id, { lessons: new Set(), lastActiveAt: null, activeToday: false, checkedInToday: false, checkinDates: new Set() });
      const entry = byStudent.get(row.user_id);
      const created = row.created_at ? new Date(row.created_at) : null;
      if (created && (!entry.lastActiveAt || created > entry.lastActiveAt)) entry.lastActiveAt = created;
      if (row.activity_type === 'learning') { entry.lessons.add(row.activity_key.split(':')[0]); if (row.activity_key.endsWith(`:${todayKey}`)) entry.activeToday = true; }
      else if (row.activity_type === 'quest') { if (row.activity_key.endsWith(`:${todayKey}`)) entry.activeToday = true; }
      else if (row.activity_type === 'checkin') { entry.checkinDates.add(row.activity_key); if (row.activity_key === todayKey) entry.checkedInToday = true; }
    }
    const students = studentsResult.rows.map((row) => {
      const entry = byStudent.get(row.id);
      const exp = Number(row.current_exp) || 0;
      const streak = entry ? streakFromDates([...entry.checkinDates]) : 0;
      return { id: row.id, fullName: row.full_name, grade: row.grade, className: row.class_name || null, exp, level: Math.floor(exp / 100), expInLevel: exp % 100, streak, lessonsCompleted: entry ? entry.lessons.size : 0, completedLessons: entry ? [...entry.lessons] : [], lastActiveAt: entry?.lastActiveAt ? entry.lastActiveAt.toISOString() : null, activeToday: Boolean(entry?.activeToday), checkedInToday: Boolean(entry?.checkedInToday) };
    });
    const classMap = new Map();
    for (const student of students) {
      const key = student.className || 'Tanpa kelas';
      if (!classMap.has(key)) classMap.set(key, { name: key, grade: student.grade, studentCount: 0, lessonsCompleted: 0, expTotal: 0, activeToday: 0 });
      const cls = classMap.get(key); cls.studentCount += 1; cls.lessonsCompleted += student.lessonsCompleted; cls.expTotal += student.exp; if (student.activeToday) cls.activeToday += 1;
    }
    const classes = [...classMap.values()].map((cls) => ({ name: cls.name, grade: cls.grade, studentCount: cls.studentCount, lessonsCompleted: cls.lessonsCompleted, averageExp: Math.round(cls.expTotal / cls.studentCount), activeToday: cls.activeToday }));
    const activityByDay = [];
    for (let offset = 6; offset >= 0; offset -= 1) {
      const day = new Date(); day.setUTCHours(0, 0, 0, 0); day.setUTCDate(day.getUTCDate() - offset);
      activityByDay.push({ date: day.toISOString().slice(0, 10), count: activityResult.rows.filter((row) => row.created_at && new Date(row.created_at).toISOString().slice(0, 10) === day.toISOString().slice(0, 10)).length });
    }
    return res.json({ students, classes, activityByDay });
  } catch (error) { console.error('Teacher analytics error:', error.message); return res.status(503).json({ message: 'Unable to load class analytics' }); }
});

app.get('/api/students', requireAuth, requireRole('teacher'), async (req, res) => {
  try { const result = await query(`${userQuery} WHERE sp.teacher_id = $1 ORDER BY sp.created_at DESC`, [req.auth.sub]); return res.json({ students: result.rows.map(toPublicUser) }); }
  catch (error) { console.error('List students error:', error.message); return res.status(503).json({ message: 'Unable to load students' }); }
});
app.get('/api/students/:id', requireAuth, requireRole('teacher'), async (req, res) => {
  try { const result = await query(`${userQuery} WHERE sp.user_id = $1 AND sp.teacher_id = $2`, [req.params.id, req.auth.sub]); if (!result.rows[0]) return res.status(404).json({ message: 'Student not found' }); return res.json({ student: toPublicUser(result.rows[0]) }); }
  catch { return res.status(503).json({ message: 'Unable to load student' }); }
});

app.post('/api/students', requireAuth, requireRole('teacher'), async (req, res) => {
  const parsed = studentSchema.safeParse(req.body); if (!parsed.success) return sendValidationError(res, parsed.error);
  const client = await getClient();
  try {
    await client.query('BEGIN');
    const existing = await client.query('SELECT 1 FROM users WHERE username = $1 UNION SELECT 1 FROM student_profiles WHERE nis = $2', [parsed.data.nis, parsed.data.nis]);
    if (existing.rowCount) { await client.query('ROLLBACK'); return res.status(409).json({ message: 'Student ID / NIS already exists' }); }
    const classLookup = await client.query('SELECT id FROM classes WHERE name = $1 AND grade = $2 AND teacher_id = $3', [parsed.data.className, parsed.data.grade, req.auth.sub]);
    const classId = classLookup.rows[0]?.id || randomUUID();
    if (!classLookup.rows[0]) await client.query('INSERT INTO classes (id, name, grade, teacher_id) VALUES ($1, $2, $3, $4)', [classId, parsed.data.className, parsed.data.grade, req.auth.sub]);
    const passwordHash = await bcrypt.hash(DEFAULT_STUDENT_PASSWORD, 12);
    const userId = randomUUID();
    await client.query("INSERT INTO users (id, full_name, username, password_hash, role, level_id, language) VALUES ($1, $2, $3, $4, 'student', $5, $6)", [userId, parsed.data.fullName, parsed.data.nis, passwordHash, parsed.data.levelId, parsed.data.language]);
    await client.query('INSERT INTO student_profiles (user_id, nis, teacher_id, class_id, grade, initial_level_id) VALUES ($1, $2, $3, $4, $5, $6)', [userId, parsed.data.nis, req.auth.sub, classId, parsed.data.grade, parsed.data.levelId]);
    await client.query('COMMIT'); return res.status(201).json({ message: 'Student created successfully', id: userId, defaultPassword: DEFAULT_STUDENT_PASSWORD });
  } catch (error) { await client.query('ROLLBACK'); console.error('Create student error:', error.message); return res.status(400).json({ message: 'Unable to create student' }); } finally { client.release(); }
});

app.post('/api/students/:id/reset-password', requireAuth, requireRole('teacher'), async (req, res) => {
  try {
    const owned = await query('SELECT user_id FROM student_profiles WHERE user_id = $1 AND teacher_id = $2', [req.params.id, req.auth.sub]);
    if (!owned.rowCount) return res.status(404).json({ message: 'Student not found' });
    const passwordHash = await bcrypt.hash(DEFAULT_STUDENT_PASSWORD, 12);
    await query('UPDATE users SET password_hash = $1 WHERE id = $2', [passwordHash, req.params.id]);
    return res.json({ message: 'Password reset successfully', defaultPassword: DEFAULT_STUDENT_PASSWORD });
  } catch { return res.status(400).json({ message: 'Unable to reset student password' }); }
});

app.put('/api/students/:id', requireAuth, requireRole('teacher'), async (req, res) => {
  const parsed = studentUpdateSchema.safeParse(req.body); if (!parsed.success) return sendValidationError(res, parsed.error);
  const data = parsed.data; const client = await getClient();
  try {
    await client.query('BEGIN');
    const owned = await client.query('SELECT user_id FROM student_profiles WHERE user_id = $1 AND teacher_id = $2', [req.params.id, req.auth.sub]);
    if (!owned.rowCount) { await client.query('ROLLBACK'); return res.status(404).json({ message: 'Student not found' }); }
    const userFields = []; const userValues = []; let index = 1;
    if (data.fullName) { userFields.push(`full_name = $${index++}`); userValues.push(data.fullName); } if (data.language) { userFields.push(`language = $${index++}`); userValues.push(data.language); } if (data.levelId) { userFields.push(`level_id = $${index++}`); userValues.push(data.levelId); } if (data.password) { userFields.push(`password_hash = $${index++}`); userValues.push(await bcrypt.hash(data.password, 12)); }
    if (userFields.length) { userValues.push(req.params.id); await client.query(`UPDATE users SET ${userFields.join(', ')} WHERE id = $${index}`, userValues); }
    const profileFields = []; const profileValues = []; index = 1;
    if (data.nis) { profileFields.push(`nis = $${index++}`); profileValues.push(data.nis); } if (data.grade) { profileFields.push(`grade = $${index++}`); profileValues.push(data.grade); } if (data.levelId) { profileFields.push(`initial_level_id = $${index++}`); profileValues.push(data.levelId); }
    if (data.className && data.grade) { const classLookup = await client.query('SELECT id FROM classes WHERE name = $1 AND grade = $2 AND teacher_id = $3', [data.className, data.grade, req.auth.sub]); const classId = classLookup.rows[0]?.id || randomUUID(); if (!classLookup.rows[0]) await client.query('INSERT INTO classes (id, name, grade, teacher_id) VALUES ($1, $2, $3, $4)', [classId, data.className, data.grade, req.auth.sub]); profileFields.push(`class_id = $${index++}`); profileValues.push(classId); }
    if (profileFields.length) { profileValues.push(req.params.id); await client.query(`UPDATE student_profiles SET ${profileFields.join(', ')} WHERE user_id = $${index}`, profileValues); }
    await client.query('COMMIT'); return res.json({ message: 'Student updated successfully' });
  } catch { await client.query('ROLLBACK'); return res.status(400).json({ message: 'Unable to update student' }); } finally { client.release(); }
});
app.delete('/api/students/:id', requireAuth, requireRole('teacher'), async (req, res) => {
  try { const result = await query('UPDATE users u INNER JOIN student_profiles sp ON u.id = sp.user_id SET u.is_active = FALSE WHERE u.id = $1 AND sp.teacher_id = $2', [req.params.id, req.auth.sub]); if (!result.rowCount) return res.status(404).json({ message: 'Student not found' }); return res.json({ message: 'Student deactivated successfully' }); }
  catch { return res.status(400).json({ message: 'Unable to deactivate student' }); }
});

app.get('/', (req, res) => res.json({ message: 'Logical API is running', health: '/api/health' }));
if (require.main === module) {
  app.listen(PORT, () => console.log(`Logical API berjalan di http://localhost:${PORT}`));
  ensureProfilePhotoColumn().then((status) => { if (status === 'error' || status === 'missing-table') setTimeout(() => { void ensureProfilePhotoColumn(); }, 20000); });
  ensureStudentActivities().then((status) => { if (status === 'error' || status === 'missing-table') setTimeout(() => { void ensureStudentActivities(); }, 20000); });
  ensureQuestActivityType().then((status) => { if (status === 'error' || status === 'missing-table') setTimeout(() => { void ensureQuestActivityType(); }, 20000); });
  ensurePetNameColumn().then((status) => { if (status === 'error' || status === 'missing-table') setTimeout(() => { void ensurePetNameColumn(); }, 20000); });
}
module.exports = app;
