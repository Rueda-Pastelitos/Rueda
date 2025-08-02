// index.js
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Rotta per inviare testimonianze
app.post("/api/testimonianze", async (req, res) => {
  const { nome, recensione } = req.body;
  try {
    await pool.query(
      "INSERT INTO testimonianze (nome, recensione) VALUES ($1, $2)",
      [nome, recensione]
    );
    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore nel salvataggio" });
  }
});

// Rotta per leggere testimonianze
app.get("/api/testimonianze", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM testimonianze ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore nel recupero" });
  }
});

app.listen(port, () => {
  console.log(`RUEDA backend attivo su http://localhost:${port}`);
});
