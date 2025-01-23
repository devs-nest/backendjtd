const express = require('express');
const userRoutes = require('./routes/userRoutes')
const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use('/api/users', userRoutes);

module.exports = app;