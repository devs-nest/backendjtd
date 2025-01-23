const express = require('express');
const userProfileController = require('../controllers/userProfileController');
// const authenticateToken = require("../middlewares/authenticateToken")
const router = express.Router();


router.post('/', userProfileController.createUserProfile);
router.get('/:id', userProfileController.getUserProfileByUserId);

module.exports = router;