const express = require('express');
const fetch = require('node-fetch'); // If you get errors, use "npm install node-fetch"
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/ayah/:num', async (req, res) => {
  const num = req.params.num;
  const url = `https://api.alquran.cloud/v1/ayah/${num}/editions/quran-uthmani,en.sahih`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data); // Forward everything to the frontend
  } catch (err) {
    res.status(500).json({ error: 'API error', detail: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Quran API Proxy is running.');
});

app.listen(PORT, () => console.log(`Backend proxy listening on port ${PORT}`));
