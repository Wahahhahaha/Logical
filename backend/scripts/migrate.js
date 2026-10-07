const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { query, closePool } = require('../src/db');

async function migrate() {
  if (!process.env.DATABASE_NAME) throw new Error('DATABASE_NAME is missing. Copy .env.example to .env and configure MySQL first.');
  const migrationDir = path.join(__dirname, '..', 'migrations');
  const files = fs.readdirSync(migrationDir).filter((file) => /^\d+_.*\.sql$/.test(file)).sort();
  for (const file of files) { await query(fs.readFileSync(path.join(migrationDir, file), 'utf8')); console.log(`${file} applied.`); }
}

migrate().catch((error) => { console.error('Migration failed:', error.message); process.exitCode = 1; }).finally(() => closePool());
