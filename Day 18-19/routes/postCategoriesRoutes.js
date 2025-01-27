const express = require('express');
const postCategoriesController = require('../controllers/postCategoriesController');
const router = express.Router();

router.post('/createPost', postCategoriesController.createPost);
router.get('/getpost/:id', postCategoriesController.getPost);
router.post('/category', postCategoriesController.createCategory);
router.get('/postsFromCategory/:name/:date', postCategoriesController.getPostsWithCategory);


module.exports = router;