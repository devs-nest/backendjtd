const booksServices = require('../services/booksServices');


const getBooks = async (req, res) => {
    const user = req.user
   
    try {
            const books = booksServices.getBooks(user)       
            const result = books.rows[0];
            res.json({ result });
          } catch (error) {
            console.log("error",error);
          } 
};




module.exports = {
    getBooks
};
