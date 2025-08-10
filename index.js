//root_index.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const exampleRouter = require('./routes/example');
const testimonianzeRouter = require('./routes/testimonianze');
const pool = require('./db/pool'); // Assicurati che il path sia corretto

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 🌐 Middleware
app.use(cors());
app.use(express.json());

// 📁 Static files
app.use(express.static(path.join(__dirname, 'public')));

// 🛣️ API routes
app.use('/api/example', exampleRouter);
app.use('/api/testimonianze', testimonianzeRouter);

// 🧱 Creazione tabella "testimonianze"
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
    console.error('❌ Errore nella creazione della tabella:', err.message);
    process.exit(1); // Termina il server se la tabella non può essere creata
  }
}

// 🚀 Avvio del server
app.listen(PORT, async () => {
  console.log(`✅ Server avviato su http://localhost:${PORT}`);
  await ensureTableExists();
});
