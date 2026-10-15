require('dotenv').config();
const mysql = require('mysql2/promise');
const normalizePlaceholders = sql => sql.replace(/\$\d+/g, '?');
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
(async () => {
  const c = await mysql.createConnection({ host: 'localhost', port: 3306, database: process.env.DATABASE_NAME, user: process.env.DATABASE_USER, password: process.env.DATABASE_PASSWORD, connectTimeout: 8000 });
  try {
    const userQuery = `SELECT u.*, sp.nis, sp.grade, sp.class_id, c.name AS class_name, sp.current_exp, sp.current_streak, sp.pet_type, sp.pet_name, sp.onboarding_completed FROM users u LEFT JOIN student_profiles sp ON sp.user_id = u.id LEFT JOIN classes c ON c.id = sp.class_id`;
    const [users] = await c.query(normalizePlaceholders(`${userQuery} WHERE u.id = $1 AND u.is_active = TRUE`), ['41dc5a7a-d86b-46c0-a591-89acc79613a6']);
    console.log('user rows:', users.length);
    if (users.length) {
      const [acts] = await c.query(normalizePlaceholders("SELECT DISTINCT activity_key FROM student_activities WHERE user_id = $1 AND activity_type = 'checkin'"), ['41dc5a7a-d86b-46c0-a591-89acc79613a6']);
      console.log('chkin rows:', acts.length, acts.map(r => r.activity_key));
      const streak = streakFromDates(acts.map(r => r.activity_key));
      console.log('computed streak:', streak);
      const [upd] = await c.query(normalizePlaceholders('UPDATE student_profiles SET current_streak = $1 WHERE user_id = $2'), [streak, '41dc5a7a-d86b-46c0-a591-89acc79613a6']);
      console.log('update affected:', upd.affectedRows);
    }
  } catch (e) { console.log('ERR', e.code || '', e.message); }
  await c.end();
})();
