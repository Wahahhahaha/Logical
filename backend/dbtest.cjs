require('dotenv').config();
const mysql = require('mysql2/promise');
(async () => {
  try {
    const c = await mysql.createConnection({ host: 'localhost', port: 3306, database: process.env.DATABASE_NAME, user: process.env.DATABASE_USER, password: process.env.DATABASE_PASSWORD, connectTimeout: 8000 });
    const [cols] = await c.query('SHOW COLUMNS FROM student_profiles');
    console.log('DB_OK cols:', cols.map(r => r.Field).join(','));
    const [dbs] = await c.query('SHOW DATABASES');
    console.log('dbs:', dbs.map(r => Object.values(r)[0]).join(','));
    await c.end();
  } catch (e) { console.log('DB_FAIL', e.code || '', e.message); }
})();
