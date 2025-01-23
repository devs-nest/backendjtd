const express = require('express');
const postCategoriesController = require('../controllers/postCategoriesController');
const router = express.Router();

router.post('/post', postCategoriesController.createPost);
router.get('/post', postCategoriesController.getPost);
router.post('/category', postCategoriesController.createCategory);

module.exports = router;