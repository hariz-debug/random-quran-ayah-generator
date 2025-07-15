const express = require('express');
const fetch = require('node-fetch'); // install this if you haven't: npm install node-fetch

const app = express();
const PORT = process.env.PORT || 10000;

// === ADD THIS BLOCK! ===
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// === END ADD ===

// Route to check if proxy is running
app.get('/', (req, res) => {
  res.send('Quran API Proxy is running.');
});

// Proxy route for ayah
app.get('/api/ayah', async (req, res) => {
  const number = req.query.number;
  if (!number) {
    return res.status(400).json({ error: 'No ayah number provided' });
  }
  try {
    // Fetch from AlQuran.cloud API
    const response = await fetch(`https://api.alquran.cloud/v1/ayah/${number}/editions/quran-uthmani,en.sahih`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ayah' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy listening on port ${PORT}`);
});
