
const prisma = require('../prisma/prismaClient');


const createPost = async (data) => {
    // categories = {connectOrCreate:[]}
    // for (let i =0;i<data.categories.length;i++){
    //     categories['connectOrCreate'].push(
    //         {
    //             where :{name:data.categories[i]},
    //             create: {name:data.categories[i]}
    //           }
    //     )
    // }
    return prisma.post.create({
      data:{
        title: data.title,
        content: data.content,
        author: {connect: {id: data.userId}},
        categories: {
          connectOrCreate:[
            {
              where :{name:"Tech"},
              create: {name:"Tech"}
            },
            {
                where :{name:"Programming"},
                create: {name:"Programming"}
            }
          ]
        }
      }
    });
  };


const getPost = async (userId) => {
    return await prisma.post.findMany({
        where: { authorId: userId },
})
};

const createCategory = async (id) => {
    return prisma.category.create({
        data:{
          name: data.name,
        }})
};

const getPostsWithCategory = async(categoryName,createdAt) =>{
    return await prisma.post.findMany({
        where: {
            categories: {
                some: {
                    name:categoryName
                },
            },
            createdAt:{
                gt: createdAt
            }
        },
    // include: {
    //     categories:true
    // }
    })
   
}


module.exports = {
    createCategory,
    getPost,
    createPost,
    getPostsWithCategory
};
