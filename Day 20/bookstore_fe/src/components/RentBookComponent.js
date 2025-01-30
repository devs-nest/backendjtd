import { useState, useEffect } from "react";
import axios from "axios";

const RentBookComponent = () => {
    const [bookId, setBookId] = useState("");
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");

    useEffect(() => {
        // Fetch customers from backend when component mounts
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

    const rentBook = async () => {
        try {
            await axios.post(
                "http://localhost:3001/rentBook",
                { book_id: bookId, user_id: selectedCustomer },
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
            
            <button onClick={rentBook}>Confirm Rent</button>
        </div>
    );
};

export default RentBookComponent;
