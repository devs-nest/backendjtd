const express = require('express');
const userRoutes = require('./routes/userRoutes')
const userProfileRoutes = require('./routes/userProfileRoutes')
// const postCategoriesRoutes = require('./routes/postCategoriesRoutes')
const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/profile', userProfileRoutes);
// app.use('/api/postCategories', postCategoriesRoutes);

module.exports = app;