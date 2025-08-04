require('dotenv').config(); // Must be first

console.log('=== ENV DEBUG ===');
console.log('Current directory:', __dirname);
console.log('MONGODB_URI loaded:', !!process.env.MONGODB_URI);
console.log('MONGO_URI loaded:', !!process.env.MONGO_URI);
console.log('==================');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();

// CORS - allow frontend origin
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB - FIXED: Use MONGODB_URI or MONGO_URI
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!mongoUri) {
  console.error('ERROR: No MongoDB URI found in environment variables');
  console.error('Please set either MONGODB_URI or MONGO_URI in your .env file');
  process.exit(1);
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Mount routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});