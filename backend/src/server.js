const express = require('express');
const { randomUUID } = require('crypto');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
require('dotenv').config();

const { query, getClient } = require('./db');
const { signUser, requireAuth, requireRole } = require('./auth');

const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = (process.env.FRONTEND_ORIGIN || '').split(',').map((value) => value.trim()).filter(Boolean);

app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false });
const DEFAULT_STUDENT_PASSWORD = '12345';

const loginSchema = z.object({ username: z.string().trim().min(1).max(80), password: z.string().min(1).max(120) });
const studentSchema = z.object({ fullName: z.string().trim().min(2).max(120), nis: z.string().trim().min(1).max(40), grade: z.string().trim().min(1).max(30), className: z.string().trim().min(1).max(80), levelId: z.coerce.number().int().positive(), language: z.enum(['id-ID', 'en-US']).default('id-ID') });
const studentUpdateSchema = studentSchema.partial().extend({ password: z.string().min(4).max(120).optional() });
const profileSchema = z.object({ fullName: z.string().trim().min(2).max(120), language: z.enum(['id-ID', 'en-US']) });
const learningActivitySchema = z.object({ lessonKey: z.string().trim().min(1).max(100) });

function sendValidationError(res, error) { const details = error.issues?.map((issue) => `${issue.path.join('.') || 'request'}: ${issue.message}`).join('; '); return res.status(400).json({ message: details ? `Invalid request data: ${details}` : 'Invalid request data', issues: error.issues }); }
function toPublicUser(row) {
  return { id: row.id, fullName: row.full_name, username: row.username, role: row.role, levelId: row.level_id, levelName: row.level_name || null, language: row.language, profile: row.nis ? { nis: row.nis, grade: row.grade, classId: row.class_id, className: row.class_name, currentExp: row.current_exp, currentStreak: row.current_streak, petType: row.pet_type || 'egg', onboardingCompleted: row.onboarding_completed } : null };
}

app.get('/api/health', async (req, res) => {
  try { await query('SELECT 1'); return res.json({ status: 'ok', service: 'mathpath-api', database: 'connected', timestamp: new Date().toISOString() }); }
  catch { return res.status(503).json({ status: 'degraded', service: 'mathpath-api', database: 'unavailable', message: 'Database connection is not available' }); }
});
app.get('/api/config', (req, res) => res.json({ supportedLanguages: ['id-ID', 'en-US'], roles: ['teacher', 'student'], ai: { provider: 'groq', clientAccessible: false } }));

const userQuery = `SELECT u.*, l.name AS level_name, sp.nis, sp.grade, sp.class_id, c.name AS class_name, sp.current_exp, sp.current_streak, sp.pet_type, sp.onboarding_completed FROM users u LEFT JOIN levels l ON l.id = u.level_id LEFT JOIN student_profiles sp ON sp.user_id = u.id LEFT JOIN classes c ON c.id = sp.class_id`;

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
  try { const result = await query(`${userQuery} WHERE u.id = $1 AND u.is_active = TRUE`, [req.auth.sub]); if (!result.rows[0]) return res.status(404).json({ message: 'User not found' }); return res.json({ user: toPublicUser(result.rows[0]) }); }
  catch { return res.status(503).json({ message: 'Unable to connect to the database' }); }
});

app.put('/api/profile', requireAuth, async (req, res) => {
  const parsed = profileSchema.safeParse(req.body); if (!parsed.success) return sendValidationError(res, parsed.error);
  try { await query('UPDATE users SET full_name = $1, language = $2 WHERE id = $3', [parsed.data.fullName, parsed.data.language, req.auth.sub]); const result = await query(`${userQuery} WHERE u.id = $1`, [req.auth.sub]); return res.json({ user: toPublicUser(result.rows[0]) }); }
  catch { return res.status(503).json({ message: 'Unable to save profile' }); }
});
app.put('/api/student/onboarding', requireAuth, requireRole('student'), async (req, res) => {
  const petSchema = z.object({ pet: z.enum(['egg', 'cat', 'dog', 'fox']).default('egg') });
  const parsed = petSchema.safeParse(req.body); if (!parsed.success) return sendValidationError(res, parsed.error);
  try { await query('UPDATE student_profiles SET onboarding_completed = TRUE, pet_type = $1 WHERE user_id = $2', [parsed.data.pet, req.auth.sub]); const result = await query(`${userQuery} WHERE u.id = $1`, [req.auth.sub]); return res.json({ user: toPublicUser(result.rows[0]), pet: parsed.data.pet }); }
  catch { return res.status(503).json({ message: 'Unable to complete onboarding' }); }
});
app.get('/api/student/pet', requireAuth, requireRole('student'), async (req, res) => {
  try {
    const result = await query(`${userQuery} WHERE u.id = $1 AND u.is_active = TRUE`, [req.auth.sub]);
    if (!result.rows[0]) return res.status(404).json({ message: 'Student not found' });
    const user = toPublicUser(result.rows[0]); const exp = user.profile?.currentExp || 0;
    return res.json({ pet: user.profile?.petType || 'egg', level: Math.floor(exp / 100), exp, expInLevel: exp % 100, expToNextLevel: 100, streak: user.profile?.currentStreak || 0, onboardingCompleted: Boolean(user.profile?.onboardingCompleted) });
  } catch { return res.status(503).json({ message: 'Unable to load pet progress' }); }
});
app.post('/api/student/activity/complete', requireAuth, requireRole('student'), async (req, res) => {
  const parsed = learningActivitySchema.safeParse(req.body); if (!parsed.success) return sendValidationError(res, parsed.error);
  const client = await getClient(); const dateKey = new Date().toISOString().slice(0, 10); const activityKey = `${parsed.data.lessonKey}:${dateKey}`;
  try {
    await client.query('BEGIN');
    const learning = await client.query("INSERT IGNORE INTO student_activities (id, user_id, activity_type, activity_key, points) VALUES ($1, $2, 'learning', $3, 5)", [randomUUID(), req.auth.sub, activityKey]);
    let learningAwarded = learning.rowCount > 0 ? 5 : 0;
    if (learningAwarded) await client.query('UPDATE student_profiles SET current_exp = current_exp + 5 WHERE user_id = $1', [req.auth.sub]);
    const checkin = await client.query("INSERT IGNORE INTO student_activities (id, user_id, activity_type, activity_key, points) VALUES ($1, $2, 'checkin', $3, 10)", [randomUUID(), req.auth.sub, dateKey]);
    const checkinAwarded = checkin.rowCount > 0 ? 10 : 0;
    if (checkinAwarded) await client.query('UPDATE student_profiles SET current_exp = current_exp + 10, current_streak = current_streak + 1 WHERE user_id = $1', [req.auth.sub]);
    await client.query('COMMIT');
    const result = await query(`${userQuery} WHERE u.id = $1`, [req.auth.sub]); const user = toPublicUser(result.rows[0]); const exp = user.profile?.currentExp || 0;
    return res.json({ message: 'Learning activity recorded', user, learningAwarded, checkinAwarded, totalAwarded: learningAwarded + checkinAwarded, level: Math.floor(exp / 100), exp, expInLevel: exp % 100, expToNextLevel: 100, streak: user.profile?.currentStreak || 0 });
  } catch (error) { await client.query('ROLLBACK'); console.error('Complete activity error:', error.message); return res.status(400).json({ message: 'Unable to record learning activity' }); } finally { client.release(); }
});
app.get('/api/levels', requireAuth, async (req, res) => { try { return res.json({ levels: (await query('SELECT id, name, description FROM levels ORDER BY id')).rows }); } catch { return res.status(503).json({ message: 'Unable to load levels' }); } });
app.get('/api/classes', requireAuth, requireRole('teacher'), async (req, res) => { try { return res.json({ classes: (await query('SELECT id, name, grade FROM classes WHERE teacher_id = $1 ORDER BY grade, name', [req.auth.sub])).rows }); } catch { return res.status(503).json({ message: 'Unable to load classes' }); } });

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

app.get('/', (req, res) => res.json({ message: 'Mathpath API is running', health: '/api/health' }));
if (require.main === module) app.listen(PORT, () => console.log(`Mathpath API berjalan di http://localhost:${PORT}`));
module.exports = app;
