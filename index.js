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
app.listen(PORT, () => {
  console.log(`✅ Server avviato su http://localhost:${PORT}`);
});
