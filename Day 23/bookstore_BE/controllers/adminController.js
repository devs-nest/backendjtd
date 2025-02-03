const adminServices = require("../services/adminServices");
const booksServices = require("../services/booksServices");

const addBook = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      available: req.body.quantity,
    };
    const book = booksServices.addBook(data);
    const result = book.rows;
    res.json({ result });
  } catch (error) {
    console.log("error", error);
  }
};

const rentBook = async (req, res) => {
  try {
    //  const {user_id, book_id, quantity} = req.body
    const user = await adminServices.checkCustomerExists(parseInt(req.body.user_id));

    if (!user.rows) {
      return res.status(400).json({ error: "user doesnt exist" });
    }
    const book = await adminServices.checkBookExists(parseInt(req.body.book_id));
    if (!book.rows) {
      return res.status(400).json({ error: "book doesnt exist" });
    }
    const rental = await adminServices.rentBook(req.body);
    const result = rental.rows;
    res.json({ result });
  } catch (error) {
    console.log("error", error);
  }
};

const editBook = async (req, res) => {
  try {
    const values = [];
    const fields = [];
    const { book_id } = req.params;
    const updateData = req.body;
    const index = 1;
    if (!book_id) {
      return res.status(400).json({ error: "No book provided for update" });
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    for (const [key, value] of Object.entries(updateData)) {
      if (value != undefined) {
        fields.push(`${key} = $${index}`);
        values.push(value);
        index++;
      }
    }
    values.push(book_id);

    const book = booksServices.editBook(fields, values, index);
    const result = book.rows;
    res.json({ result });
  } catch (error) {
    console.log("error", error);
  }
};

const returnBook = async (req, res) => {
  // Update rented,available in books table
  //Update rental_status in my rental_status

  const { user_id, book_id } = req.body;
  const user = adminServices.checkCustomerExists(req.body.user_id);
  if (!user) {
    return res.status(400).json({ error: "user doesnt exist" });
  }
  const book = adminServices.checkBookExists(req.body.book_id);
  if (!book) {
    return res.status(400).json({ error: "book doesnt exist" });
  }
  const books = adminServices.returnBook({
    rental_quantity: book.rows[0].rental_quantity,
    user_id : user_id,
    book_id : book_id
  });
  res.status(200).json({ books: books, message: "Book Returned Succesfully" });
};

const getCustomers = async (req, res) => {
  // Update rented,available in books table
  //Update rental_status in my rental_status

  const customers = await adminServices.getCustomers()
  res.status(200).json({ customers: customers.rows, message: "Customers Returned Succesfully" });
};

module.exports = {
  addBook,
  rentBook,
  editBook,
  returnBook,
  getCustomers
};
