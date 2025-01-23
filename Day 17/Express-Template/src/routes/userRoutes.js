const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require("../middlewares/authenticateToken")
const router = express.Router();

router.get('/hello')
router.post('/', userController.createUser);
router.get('/', authenticateToken,userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;