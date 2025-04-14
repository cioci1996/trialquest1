require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const poiRoutes = require('./routes/poiRoutes');
const shopRoutes = require('./routes/shopRoutes'); // ✅ Shop route included

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/pois', poiRoutes);
app.use('/api/shop', shopRoutes); // ✅ Shop endpoint

// Base test route
app.get('/', (req, res) => res.send('TrailQuest Backend is Running!'));

// Start the server (fixed syntax here 👇)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
