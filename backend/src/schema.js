const { query } = require('./db');

const PROFILE_PHOTO_COLUMN_SQL = 'ALTER TABLE users ADD COLUMN photo_url VARCHAR(500) NULL AFTER language';
const PET_NAME_COLUMN_SQL = "ALTER TABLE student_profiles ADD COLUMN pet_name VARCHAR(40) NULL AFTER pet_type";
const STUDENT_ACTIVITIES_SQL = `CREATE TABLE IF NOT EXISTS student_activities (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  activity_type ENUM('learning', 'checkin', 'quest') NOT NULL,
  activity_key VARCHAR(160) NOT NULL,
  points INT UNSIGNED NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_activity_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_student_activity (user_id, activity_type, activity_key),
  INDEX idx_student_activity_date (user_id, created_at)
) ENGINE=InnoDB;`;

async function tableExists(tableName) {
  const result = await query('SELECT COUNT(*) AS present FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = $1', [tableName]);
  return Number(result.rows[0]?.present) > 0;
}

async function columnExists(tableName, columnName) {
  const result = await query('SELECT COUNT(*) AS present FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = $1 AND column_name = $2', [tableName, columnName]);
  return Number(result.rows[0]?.present) > 0;
}

async function ensureProfilePhotoColumn() {
  try {
    if (!(await tableExists('users'))) return 'missing-table';
    if (await columnExists('users', 'photo_url')) return 'ok';
    await query(PROFILE_PHOTO_COLUMN_SQL);
    console.log('Schema: added missing column users.photo_url');
    return 'added';
  } catch (error) {
    console.warn('Schema check for users.photo_url skipped:', error.message);
    return 'error';
  }
}

async function ensureQuestActivityType() {
  try {
    if (!(await tableExists('student_activities'))) return 'missing-table';
    const result = await query("SELECT COLUMN_TYPE AS type FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'student_activities' AND column_name = 'activity_type'");
    if (String(result.rows[0]?.type || '').includes("'quest'")) return 'ok';
    await query("ALTER TABLE student_activities MODIFY COLUMN activity_type ENUM('learning', 'checkin', 'quest') NOT NULL");
    console.log('Schema: added quest to student_activities.activity_type');
    return 'added';
  } catch (error) {
    console.warn('Schema check for student_activities.activity_type skipped:', error.message);
    return 'error';
  }
}

async function ensurePetNameColumn() {
  try {
    if (!(await tableExists('student_profiles'))) return 'missing-table';
    if (await columnExists('student_profiles', 'pet_name')) return 'ok';
    await query(PET_NAME_COLUMN_SQL);
    console.log('Schema: added missing column student_profiles.pet_name');
    return 'added';
  } catch (error) {
    console.warn('Schema check for student_profiles.pet_name skipped:', error.message);
    return 'error';
  }
}

async function ensureStudentActivities() {
  try {
    if (!(await tableExists('users'))) return 'missing-table';
    if (await tableExists('student_activities')) return 'ok';
    await query(STUDENT_ACTIVITIES_SQL);
    console.log('Schema: created table student_activities');
    return 'created';
  } catch (error) {
    console.warn('Schema check for student_activities skipped:', error.message);
    return 'error';
  }
}

module.exports = { ensureProfilePhotoColumn, ensureQuestActivityType, ensurePetNameColumn, ensureStudentActivities };
