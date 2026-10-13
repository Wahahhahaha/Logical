require('dotenv').config();
const mysql = require('mysql2/promise');
const normalizePlaceholders = sql => sql.replace(/\$\d+/g, '?');
(async () => {
  try {
    const c = await mysql.createConnection({ host: 'localhost', port: 3306, database: process.env.DATABASE_NAME, user: process.env.DATABASE_USER, password: process.env.DATABASE_PASSWORD, connectTimeout: 8000 });
    const [u] = await c.query("SELECT id FROM users WHERE role='student' LIMIT 1");
    if (!u.length) { console.log('NO_STUDENT'); return; }
    const userId = u[0].id;
    console.log('student:', userId);
    const [acts] = await c.query(normalizePlaceholders("SELECT DISTINCT activity_key FROM student_activities WHERE user_id = $1 AND activity_type = 'checkin'"), [userId]);
    console.log('checkin rows:', acts.map(r => r.activity_key).slice(0,10));
    const [upd] = await c.query(normalizePlaceholders('UPDATE student_profiles SET current_streak = $1 WHERE user_id = $2'), [0, userId]);
    console.log('update ok, affected:', upd.affectedRows);
    await c.end();
  } catch (e) { console.log('SYNC_FAIL', e.code || '', e.message); }
})();
