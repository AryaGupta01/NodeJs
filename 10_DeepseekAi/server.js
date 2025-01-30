require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nanoid = require('nanoid');
const validUrl = require('valid-url');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define URL Schema
const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    default: () => nanoid(7) // Now works with v3
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Url = mongoose.model('Url', urlSchema);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create short URL
app.post('/api/shorten', async (req, res) => {
  const { longUrl } = req.body;

  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    // Check if URL already exists
    const existingUrl = await Url.findOne({ longUrl });
    if (existingUrl) {
      return res.json(existingUrl);
    }

    // Create new URL entry
    const url = new Url({ longUrl });
    await url.save();
    res.json({
      longUrl: url.longUrl,
      shortUrl: `${req.headers.host}/${url.shortCode}`,
      shortCode: url.shortCode
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Redirect to original URL
app.get('/:shortCode', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    if (url) {
      return res.redirect(url.longUrl);
    }
    res.status(404).json({ error: 'URL not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});