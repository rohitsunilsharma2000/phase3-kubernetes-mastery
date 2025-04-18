
// backend/app.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
const logDir = '/usr/src/app/logs';

app.use(express.json());

app.post('/log', (req, res) => {
  const message = req.body.message || 'Hello from backend';
  const filePath = path.join(logDir, 'log.txt');
  fs.appendFile(filePath, `${new Date().toISOString()} - ${message}\n`, err => {
    if (err) return res.status(500).send('Failed to write log');
    res.send('Log written');
  });
});

app.get('/', (req, res) => {
  res.send('Backend is running');
});


app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});