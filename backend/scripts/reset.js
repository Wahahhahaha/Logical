const mysql = require('mysql2/promise');
require('dotenv').config();

async function reset() {
  const databaseName = process.env.DATABASE_NAME;
  if (!databaseName) throw new Error('DATABASE_NAME is missing. Copy .env.example to .env and configure MySQL first.');
  const safeName = databaseName.replace(/`/g, '');
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT || 3306),
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    connectTimeout: 8000,
  });
  try {
    await connection.query(`DROP DATABASE IF EXISTS \`${safeName}\``);
    await connection.query(`CREATE DATABASE \`${safeName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`Database "${safeName}" dropped and recreated.`);
  } finally {
    await connection.end();
  }
}

reset().catch((error) => { console.error('Reset failed:', error.message); process.exitCode = 1; });
