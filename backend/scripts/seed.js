const { randomUUID } = require('crypto');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { query, closePool } = require('../src/db');

async function findOrCreateClass(name, grade, teacherId) {
  const existing = await query('SELECT id FROM classes WHERE name = $1 AND grade = $2 AND teacher_id = $3', [name, grade, teacherId]);
  if (existing.rows[0]) return existing.rows[0].id;
  const id = randomUUID();
  await query('INSERT INTO classes (id, name, grade, teacher_id) VALUES ($1, $2, $3, $4)', [id, name, grade, teacherId]);
  return id;
}

async function seed() {
  if (!process.env.DATABASE_NAME) throw new Error('DATABASE_NAME is missing. Copy .env.example to .env and configure MySQL first.');
  const teacherPassword = await bcrypt.hash('teacher123', 12);
  const teacherId = randomUUID();
  await query("INSERT INTO users (id, full_name, username, password_hash, role) VALUES ($1, 'Demo Teacher', 'teacher.demo', $2, 'teacher') ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), password_hash = VALUES(password_hash)", [teacherId, teacherPassword]);
  const teacher = await query('SELECT id FROM users WHERE username = $1', ['teacher.demo']);
  const actualTeacherId = teacher.rows[0].id;
  const levels = (await query('SELECT id, name FROM levels')).rows.reduce((map, level) => ({ ...map, [level.name]: level.id }), {});
  const students = [['Student A', 'STU-001', 'student123', '7', 'Class A', levels.Intermediate], ['Student B', 'STU-002', 'student123', '7', 'Class A', levels.Intermediate], ['Student C', 'STU-003', 'student123', '7', 'Class A', levels.Basic]];
  for (const [fullName, nis, password, grade, className, levelId] of students) {
    const hash = await bcrypt.hash(password, 12); const userId = randomUUID();
    await query("INSERT INTO users (id, full_name, username, password_hash, role, level_id) VALUES ($1, $2, $3, $4, 'student', $5) ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), password_hash = VALUES(password_hash), level_id = VALUES(level_id)", [userId, fullName, nis, hash, levelId]);
    const user = await query('SELECT id FROM users WHERE username = $1', [nis]); const actualUserId = user.rows[0].id;
    const classId = await findOrCreateClass(className, grade, actualTeacherId);
    await query("INSERT INTO student_profiles (user_id, nis, teacher_id, class_id, grade, initial_level_id) VALUES ($1, $2, $3, $4, $5, $6) ON DUPLICATE KEY UPDATE teacher_id = VALUES(teacher_id), class_id = VALUES(class_id), grade = VALUES(grade), initial_level_id = VALUES(initial_level_id)", [actualUserId, nis, actualTeacherId, classId, grade, levelId]);
  }
  console.log('Seed complete. Teacher: teacher.demo / teacher123. Student IDs: STU-001, STU-002, STU-003 / student123.');
}

seed().catch((error) => { console.error('Seed failed:', error.message); process.exitCode = 1; }).finally(() => closePool());
