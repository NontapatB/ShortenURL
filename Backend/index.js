const express = require('express');
const shortid = require('shortid');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = new sqlite3.Database('./urls.db');

db.run('CREATE TABLE IF NOT EXISTS urls (id INTEGER PRIMARY KEY, shortUrl TEXT, longUrl TEXT)');

app.get('/allurls', (req, res) => {
  db.all('SELECT * FROM urls', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
});

app.post('/shorten', (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: 'Missing longUrl in the request body' });
  }

  const shortUrl = shortid.generate();

  db.run('INSERT INTO urls (shortUrl, longUrl) VALUES (?, ?)', [shortUrl, longUrl], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortUrl}` });
  });
});

app.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;

  db.get('SELECT * FROM urls WHERE shortUrl = ?', [shortUrl], (err, row) => {
    if (err || !row) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(301, row.longUrl);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
