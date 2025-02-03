const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();
const authMiddlewares = require("../middlewares/authMiddleware")

router.get('/get', authMiddlewares.authenticateToken, bookController.getBooks);

module.exports = router;