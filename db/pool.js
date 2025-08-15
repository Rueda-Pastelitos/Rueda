//pool;

const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:aSGLozEYytZyNJCXSsEmTyaAAWJxQAol@postgres.railway.internal:5432/railway';

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
