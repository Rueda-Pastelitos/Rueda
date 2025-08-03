// index.js
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connessione diretta al database PostgreSQL su Railway
const pool = new Pool({
  connectionString: "postgresql://postgres:AjRGWlcDKakqBymGeaVoQDHXZXRmmBEx@postgres.railway.internal:5432/railway",
  ssl: { rejectUnauthorized: false }
});

// Rotta POST per inviare una testimonianza
app.post("/api/testimonianze", async (req, res) => {
  const { nome, recensione } = req.body;
  if (!nome || !recensione) {
    return res.status(400).json({ error: "Campi obbligatori mancanti" });
  }

  try {
    await pool.query(
      "INSERT INTO testimonianze (nome, recensione) VALUES ($1, $2)",
      [nome, recensione]
    );
    res.json({ status: "ok" });
  } catch (err) {
    console.error("Errore nel salvataggio:", err);
    res.status(500).json({ error: "Errore nel salvataggio" });
  }
});

// Rotta GET per leggere tutte le testimonianze
app.get("/api/testimonianze", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM testimonianze ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Errore nel recupero:", err);
    res.status(500).json({ error: "Errore nel recupero" });
  }
});

// Avvio del server
app.listen(port, () => {
  console.log(`RUEDA backend attivo su http://localhost:${port}`);
});
