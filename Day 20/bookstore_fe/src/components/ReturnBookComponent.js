import { useState, useEffect } from "react";
import axios from "axios";

const ReturnBookComponent = () => {
    const [bookId, setBookId] = useState("");
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get("http://localhost:3001/customers", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setCustomers(response.data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
        fetchCustomers();
    }, []);

    const returnBook = async () => {
        try {
            await axios.post(
                "http://localhost:3001/returnBook",
                { book_id: bookId, user_id: selectedCustomer },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            alert("Book returned successfully!");
        } catch (error) {
            alert("Error returning book");
        }
    };

    return (
        <div className="dropdown-content">
            <label>Book ID: </label>
            <input type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} />

            <label>Select Customer: </label>
            <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
                <option value="">Select a customer</option>
                {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                        {customer.name}
                    </option>
                ))}
            </select>

            <button onClick={returnBook}>Confirm Return</button>
        </div>
    );
};

export default ReturnBookComponent;
