const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const connectDB = require('./config/db');
const profilesRouter = require('./routes/profiles');
const authRouter = require('./routes/auth');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Your React app's origin
}));

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(bodyParser.json());
app.use(passport.initialize());

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/profiles', profilesRouter);  // Connects the profiles router

// Error handling for 404
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Server setup
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});