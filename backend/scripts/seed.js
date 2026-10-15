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
  const teacherPassword = await bcrypt.hash('12345', 12);
  const teacherId = randomUUID();
  await query("INSERT INTO users (id, full_name, username, password_hash, role) VALUES ($1, 'Demo Teacher', 'teacher.demo', $2, 'teacher') ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), password_hash = VALUES(password_hash)", [teacherId, teacherPassword]);
  const teacher = await query('SELECT id FROM users WHERE username = $1', ['teacher.demo']);
  const actualTeacherId = teacher.rows[0].id;
  const students = [
    ['Student A', 'STU-001', '12345', '2', 'Class A'],
    ['Student B', 'STU-002', '12345', '2', 'Class A'],
    ['Student C', 'STU-003', '12345', '3', 'Class B'],
    ['Student D', 'STU-004', '12345', '1', 'Class C'],
    ['Student E', 'STU-005', '12345', '4', 'Class D'],
  ];
  for (const [fullName, nis, password, grade, className] of students) {
    const hash = await bcrypt.hash(password, 12); const userId = randomUUID();
    await query("INSERT INTO users (id, full_name, username, password_hash, role) VALUES ($1, $2, $3, $4, 'student') ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), password_hash = VALUES(password_hash)", [userId, fullName, nis, hash]);
    const user = await query('SELECT id FROM users WHERE username = $1', [nis]); const actualUserId = user.rows[0].id;
    const classId = await findOrCreateClass(className, grade, actualTeacherId);
    await query("INSERT INTO student_profiles (user_id, nis, teacher_id, class_id, grade) VALUES ($1, $2, $3, $4, $5) ON DUPLICATE KEY UPDATE teacher_id = VALUES(teacher_id), class_id = VALUES(class_id), grade = VALUES(grade)", [actualUserId, nis, actualTeacherId, classId, grade]);
  }
  console.log('Seed complete. Teacher: teacher.demo / 12345. Student IDs: STU-001..STU-005 / 12345.');
}

seed().catch((error) => { console.error('Seed failed:', error.message); process.exitCode = 1; }).finally(() => closePool());
