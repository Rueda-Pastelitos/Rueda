const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET: prendi tutte le testimonianze dal DB
app.get('/api/testimonianze', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM testimonianze ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Errore nel recupero testimonianze:', error);
    res.status(500).json({ error: 'Errore nel recupero testimonianze' });
  }
});

// POST: salva una nuova testimonianza nel DB
app.post('/api/testimonianze', async (req, res) => {
  const { name, text, translation } = req.body;
  if (!name || !text) {
    return res.status(400).json({ error: 'Campi obbligatori mancanti' });
  }
  try {
    const query = 'INSERT INTO testimonianze (nome, messaggio, translation) VALUES ($1, $2, $3)';
    await pool.query(query, [name, text, translation || null]);
    res.json({ status: 'ok' });
  } catch (error) {
    console.error('Errore nel salvataggio testimonianza:', error);
    res.status(500).json({ error: 'Errore nel salvataggio testimonianza' });
  }
});

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});

  fs.writeFileSync(filePath, JSON.stringify(testimonianze, null, 2));
  res.status(201).json({ message: 'Testimonianza salvata!' });
});

app.listen(PORT, () => console.log(`Server attivo su porta ${PORT}`));
