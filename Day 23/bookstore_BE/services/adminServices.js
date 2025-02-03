
const pool = require("../db")

const getCustomers = async()=>{
  const customers = await pool.query(
    `Select * from users where role='customer'`
  );
  return customers;
}

const checkCustomerExists = async (user_id) =>{
  const customer = await pool.query(`Select * from users where id = $1`,
    [user_id]
  );
  return customer;
}

const checkBookExists = async (book_id) =>{
  const book = await pool.query(
    `Select * from books where id = $1`,
    [book_id]
  );
  return book;
}

const rentBook = async (data) => {

  const rental = await pool.query(
    `Insert into rentals (user_id, book_id, rental_quantity)
    values($1, $2, $3)`,
    [data.user_id, data.book_id, data.rental_quantity]
  );

  const books = await pool.query(
    `Update books SET available = books.available - $1, rented = books.rented + $1 where id = $2`,
    [data.rental_quantity,data.book_id]
  );
  console.log(books)
  return rental;
  };


const returnBook = async (data) => {
  const rental = await pool.query(
    `Update rentals SET rental_status = False where user_id = $1 and book_id = $2`,
    [data.user_id,data.book_id]
  );

  const books = await pool.query(
    `Update books SET available = books.available + $1, rented = books.rented - $1 where book_id = $2 returning *
    `,
    [data.rental_quantity,data.book_id]
  );

  return books;
};



module.exports = {
  rentBook,
  returnBook,
  checkBookExists,
  checkCustomerExists,
  getCustomers
   
};
