const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

// Mongo URI from environment variable or Secrets
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo-service:27017/secure-fullstack-app-in-k8s';


// Middleware to parse JSON requests

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.get('/api/info', (req, res) => {
  res.json({ message: 'Backend is running' });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
