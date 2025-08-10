//root_index.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const exampleRouter = require('./routes/example');
const testimonianzeRouter = require('./routes/testimonianze'); // ✅ aggiunto

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve i file statici dal frontend
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/example', exampleRouter);
app.use('/api/testimonianze', testimonianzeRouter); // ✅ aggiunto

const PORT = process.env.PORT || 3000;

const pool = require('./db/pool'); // Assicurati che il path sia corretto
async function ensureTableExists() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS testimonianze (
        id SERIAL PRIMARY KEY,
        nome TEXT NOT NULL,
        recensione TEXT NOT NULL,
        translation TEXT,
        data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Tabella "testimonianze" pronta');
  } catch (err) {
    console.error('❌ Errore nella creazione della tabella:', err);
  }
}
ensureTableExists();
app.listen(PORT, () => {
  console.log(`✅ Server avviato su http://localhost:${PORT}`);
});
