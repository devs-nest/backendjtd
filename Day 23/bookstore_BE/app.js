const express = require('express');
const app = express();
const cors = require('cors');

const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const booksRoutes = require('./routes/booksRoutes')

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(cors())
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/adminOperations', adminRoutes);

module.exports = app;