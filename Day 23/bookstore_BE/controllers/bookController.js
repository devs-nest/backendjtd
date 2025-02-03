const booksServices = require('../services/booksServices');


const getBooks = async (req, res) => {
    const user = req.user
    console.log(user)
    try {
            const books = await booksServices.getBooks(user) 
            
            const result = books.rows;
            console.log(result)      
            res.json({ result });
          } catch (error) {
            console.log("error",error);
          } 
};




module.exports = {
    getBooks
};
