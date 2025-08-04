//server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const exampleRouter = require('./routes/example');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve i file statici da /public
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/example', exampleRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
