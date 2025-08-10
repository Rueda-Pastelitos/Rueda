//pool;
const { Pool } = require('pg');

const isLocal = process.env.NODE_ENV !== 'production';

const connectionString = isLocal
  ? 'postgresql://postgres:aSGLozEYytZyNJCXSsEmTyaAAWJxQAol@shuttle.proxy.rlwy.net:32164/railway' // public
  : 'postgresql://postgres:aSGLozEYytZyNJCXSsEmTyaAAWJxQAol@postgres.railway.internal:5432/railway'; // interna

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
