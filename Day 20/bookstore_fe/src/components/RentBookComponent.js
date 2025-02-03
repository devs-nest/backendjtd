import { useState, useEffect } from "react";
import axios from "axios";

const RentBookComponent = () => {
    const [bookId, setBookId] = useState("");
    const [customers, setCustomers] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");

    useEffect(() => {
        // Fetch customers from backend when component mounts
        const fetchCustomers = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/admin/getCustomers", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setCustomers(response.data.customers);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/books/get", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setBooks(response.data.result);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
        fetchCustomers();
        fetchBooks()
    }, []);

    const rentBook = async () => {
        try {
            await axios.post(
                "http://localhost:3001/api/admin/rentBook",
                { book_id: bookId, user_id: selectedCustomer,rental_quantity:1 },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            alert("Book rented successfully!");
        } catch (error) {
            alert("Error renting book");
        }
    };

    return (
        <div className="dropdown-content">
            <label>Book ID: </label>
            <select value={selectedCustomer} onChange={(e) => setBookId(e.target.value)}>
                <option value="">Select a Book</option>
                {books.map((book) => (
                    <option key={book.id} value={book.id}>
                        {book.name}
                    </option>
                ))}
            </select>
            {/* <input type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} /> */}
            
            <label>Select Customer: </label>
            <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
                <option value="">Select a customer</option>
                {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                        {customer.name}
                    </option>
                ))}
            </select>
            {/* <input>
            </input> */}
            
            <button onClick={rentBook}>Confirm Rent</button>
        </div>
    );
};

export default RentBookComponent;
