require('dotenv').config();
const mysql = require('mysql2/promise');
(async () => {
  const c = await mysql.createConnection({ host: 'localhost', port: 3306, database: process.env.DATABASE_NAME, user: process.env.DATABASE_USER, password: process.env.DATABASE_PASSWORD, connectTimeout: 8000 });
  const [rows] = await c.query("SELECT username, full_name, role FROM users WHERE role='student' ORDER BY full_name LIMIT 10");
  console.log(rows.map(r => `${r.username} (${r.full_name})`).join('\n'));
  await c.end();
})();
