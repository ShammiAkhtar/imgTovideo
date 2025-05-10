const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const API_KEYS = new Set([process.env.API_KEY]); // Store your API key in .env file

// Middleware to check API key
app.use((req, res, next) => {
  const userKey = req.headers['x-api-key'];
  if (!API_KEYS.has(userKey)) {
    return res.status(403).json({ error: 'Forbidden: Invalid API Key' });
  }
  next();
});

// Dummy endpoint to simulate image-to-video conversion
app.post('/api/convert', (req, res) => {
  const { imageUrl, prompt } = req.body;
  // In production, integrate with a real service like RunwayML or Kaiber
  res.json({
    status: 'success',
    message: 'Video generated (mock response)',
    videoUrl: 'https://example.com/fake-video.mp4'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
