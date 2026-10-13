require('dotenv').config();
const { query } = require('./src/db');
(async () => {
  try {
    const userId = '41dc5a7a-d86b-46c0-a591-89acc79613a6';
    const result = await query("SELECT DISTINCT activity_key FROM student_activities WHERE user_id = $1 AND activity_type = 'checkin'", [userId]);
    console.log('SELECT OK rows:', JSON.stringify(result.rows));
    const upd = await query('UPDATE student_profiles SET current_streak = $1 WHERE user_id = $2', [5, userId]);
    console.log('UPDATE OK affected:', upd.rowCount);
  } catch (e) { console.log('DBWRAP_FAIL', e.code || '', e.message); }
  process.exit(0);
})();
