const express = require('express');
const cors = require('cors');
require('dotenv').config();

const schoolRoutes = require('./src/routes/schoolRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'School Management API is running 🏫' });
});

// Routes
app.use('/api', schoolRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Unexpected server error' });
});

module.exports = app;