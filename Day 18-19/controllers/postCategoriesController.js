const postCategoriesService = require('../services/postCategoriesServices');


// router.post('/post', postCategoriesController.createPost);
// router.get('/post', postCategoriesController.getPost);
// router.post('/category', postCategoriesController.createCategory);
const createPost = async (req, res) => {
  try {
    const post = await postCategoriesService.createPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    
    res.status(400).json({ error: error.message });
  }
};

const getPost = async (req, res) => {
    const id = parseInt(req.params.id)
  try {
    const users = await postCategoriesService.getPost(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const user = await postCategoriesService.createCategory(req.body);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPostsWithCategory = async (req, res) => {
    const name = req.params.name
    const date = req.params.date
    try {
      const posts = await postCategoriesService.getPostsWithCategory(name,date);
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


module.exports = {
  createPost,
  getPost,
  createCategory,
  getPostsWithCategory
};
