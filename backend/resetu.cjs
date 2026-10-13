require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const normalizePlaceholders = sql => sql.replace(/\$\d+/g, '?');
(async () => {
  const c = await mysql.createConnection({ host: 'localhost', port: 3306, database: process.env.DATABASE_NAME, user: process.env.DATABASE_USER, password: process.env.DATABASE_PASSWORD, connectTimeout: 8000 });
  const hash = await bcrypt.hash('12345', 12);
  const [r] = await c.query(normalizePlaceholders('UPDATE users SET password_hash = $1 WHERE username = $2'), [hash, 'STU-001']);
  console.log('reset affected:', r.affectedRows);
  await c.end();
})();
