
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/testimonianze', (req, res) => {
  const filePath = path.join(__dirname, 'testimonianze.json');
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    res.json(JSON.parse(data));
  } else {
    res.json([]);
  }
});

app.post('/api/testimonianze', (req, res) => {
  const { name, text, translation } = req.body;
  if (!name || !text) {
    return res.status(400).json({ error: 'Campi obbligatori mancanti' });
  }
  const newTestimonial = {
    name,
    text,
    translation: translation || null,
    date: new Date().toISOString()
  };
  const filePath = path.join(__dirname, 'testimonianze.json');
  let testimonianze = [];
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    testimonianze = JSON.parse(data);
  }
  testimonianze.push(newTestimonial);
  fs.writeFileSync(filePath, JSON.stringify(testimonianze, null, 2));
  res.status(201).json({ message: 'Testimonianza salvata!' });
});

app.listen(PORT, () => console.log(`Server attivo su porta ${PORT}`));
