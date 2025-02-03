const pool = require("../db");

const getBooks = async (user) => {
  console.log(user.role)
  if (user.role == "admin") {
    const books = await pool.query("select * from books");
    return books
  } else if (user.role == "customer") {
    // Returning Books rented out by a specific customer
    const books = await pool.query(
      `select  b.name,
              b.description,
            b.price,
            r.rental_date,
            r.rental_quantity,
            r.return_date
        From rentals r JOIN books b 
        ON r.book_id = b.id
        where user_id = $1 and r.rental_status = TRUE;`,
      [user.id]
    );
    return books;
  }

};

const editBook = async (fields,values,index) => {
  const query = `Update books SET ${fields.join(", ")} 
  where book_id == $${index} RETURNING *`
  console.log(query)
  const book = await pool.query(query,values);
  
  return book;
};

const addBook = async (data) => {
  const books = await pool.query(
    `insert into books (name, description,price,
    quantity,available)
   values($1,$2,$3,$4,$5)`,
    [data.name, data.description, data.price, data.quantity, data.available]
  );
  return books;
};

module.exports = {
  getBooks,
  addBook,
  editBook,
};
