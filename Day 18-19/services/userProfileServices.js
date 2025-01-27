const prisma = require('../prisma/prismaClient');

const getUserProfileByUserId = async (id) => {
        // const id = req.user.id
  const userProfile = await prisma.userProfile.findUnique({
    where: {userId : id},
    select: {
        id:true,
        bio: true
    }
    // include: {
    //     user:true
    // }
  });
  return userProfile
}


const createUserProfile = async (userId, bio) => {
    try{
    const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });
  
    if (!user) {
        return 400
    }

    const profile = await prisma.userProfile.create({
        data:{
            bio:bio,
            userId:parseInt(userId)
        }
    })
    return 200
}
catch(error){
    console.log(error)
}
};


// router.post('/', userProfileController.createUserProfile);
// router.get('/:id', userProfileController.getUserProfileByUserId);

module.exports = {
    createUserProfile,
    getUserProfileByUserId,
};
