// index.js
// Importa i moduli necessari
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Carica le variabili d'ambiente da .env
dotenv.config();

// Importa le route API
const exampleRouter = require('./routes/example');

// Crea l'app Express
const app = express();

// Middleware
app.use(cors()); // Abilita CORS per richieste da altri domini
app.use(express.json()); // Permette di leggere JSON nel body delle richieste

// Serve i file statici dal frontend (public/)
app.use(express.static(path.join(__dirname, 'public')));

// Route API (esempio)
app.use('/api/example', exampleRouter);

// Porta su cui avviare il server
const PORT = process.env.PORT || 3000;

// Avvia il server
app.listen(PORT, () => {
  console.log(`✅ Server avviato su http://localhost:${PORT}`);
});
