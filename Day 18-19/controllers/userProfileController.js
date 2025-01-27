const userProfileService = require('../services/userProfileServices');

const createUserProfile = async (req, res) => {
    const { userId, bio } = req.body;
  try {
    const userProfileStatus = await userProfileService.createUserProfile(userId,bio);
    if (userProfileStatus == 200){
        res.status(201).json({"message":"Profile Created"});
    }
    else{
        res.status(userProfileStatus).json({"message":"Bad Request"});
    }
    res.status(201).json(user);
  } catch (error) {
    
    res.status(400).json({ error: error.message });
  }
};

const getUserProfileByUserId = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const users = await userProfileService.getUserProfileByUserId(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUserProfile,
  getUserProfileByUserId,
};
