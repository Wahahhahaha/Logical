const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT || 3306),
  database: process.env.DATABASE_NAME || 'mathpath',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: Number(process.env.DATABASE_CONNECTION_LIMIT || 10),
  decimalNumbers: true,
  multipleStatements: true,
});

function normalizePlaceholders(sql) { return sql.replace(/\$\d+/g, '?'); }
async function query(sql, params = []) { const [rows] = await pool.query(normalizePlaceholders(sql), params); return { rows: Array.isArray(rows) ? rows : [], rowCount: Array.isArray(rows) ? rows.length : (rows.affectedRows || 0), insertId: rows.insertId }; }
async function getClient() {
  const connection = await pool.getConnection();
  return {
    query: async (sql, params = []) => { const [rows] = await connection.query(normalizePlaceholders(sql), params); return { rows: Array.isArray(rows) ? rows : [], rowCount: Array.isArray(rows) ? rows.length : (rows.affectedRows || 0), insertId: rows.insertId }; },
    release: () => connection.release(),
  };
}
async function closePool() { await pool.end(); }

module.exports = { pool, query, getClient, closePool };
