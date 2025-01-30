const pool = require("../db");

const getBooks = async (user) => {
  const books = null;
  if (user.role == "admin") {
    const books = await pool.query("select * from books");
  } else if (user.role == "customer") {
    // Returning Books rented out by a specific customer
    const books = await pool.query("");
  }
  return books;
};

module.exports = {
  getBooks,
};
