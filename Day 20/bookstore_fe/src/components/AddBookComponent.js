import { useState } from "react";
import axios from "axios";

const AddBookComponent = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const addBook = async () => {
        try {
            await axios.post("http://localhost:3001/addBook", { name, description, price, quantity });
            alert("Book added successfully!");
        } catch (error) {
            alert("Error adding book");
        }
    };

    return (
        <div className="dropdown-content">
            <label>Book Name: </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Description: </label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <label>Price: </label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            <label>Quantity: </label>
            <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <button onClick={addBook}>Confirm Add</button>
        </div>
    );
};

export default AddBookComponent;
