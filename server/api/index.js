require('dotenv').config();
const app = require('../src/app');
const mongoose = require('mongoose');

// Connect to MongoDB globally for Vercel serverless environments
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB (Vercel Serverless)'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Export the Express app as a serverless function handler
module.exports = app;
