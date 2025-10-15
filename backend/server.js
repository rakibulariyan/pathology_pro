const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/tests', require('./routes/tests'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/billing', require('./routes/billing'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/analytics', require('./routes/analytics'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'PathoLab Pro API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

// Database connection and server start
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  });

module.exports = app;
