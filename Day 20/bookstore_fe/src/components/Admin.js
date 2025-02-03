import React, {useEffect, useState} from 'react'
import RentBookComponent from "./RentBookComponent";
import ReturnBookComponent from "./ReturnBookComponent";
import AddBookComponent from "./AddBookComponent";

import axios from 'axios';

function Admin() {
    // const books = [{
    //     id:1,
    //     title: "X",
    //     description: "YY",
    //     dateRentedOut: 'XxXXXXX',
    //     dueDate: "YYYYYY",
    //     quanity: 2,
    //     price: 150
    // },
    // {
    //     id:1,
    //     title: "X",
    //     description: "YY",
    //     dateRentedOut: "ZZZZZ",
    //     dueDate: "AAAAA",
    //     quanity:4,
    //     price:170
    // }]
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get('http://localhost:3001/api/books/get', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchData();
    }, []);

    const [openDropdown, setOpenDropdown] = useState(null);
    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    
    
    return (
        <div>
             <div>
                <button onClick={() => toggleDropdown("rent")}>Rent a Book</button>
                {openDropdown === "rent" && <div className="dropdown"><RentBookComponent /></div>}
            </div>

            <div>
                <button onClick={() => toggleDropdown("return")}>Return a Book</button>
                {openDropdown === "return" && <div className="dropdown"><ReturnBookComponent /></div>}
            </div>

            <div>
                <button onClick={() => toggleDropdown("add")}>Add a Book</button>
                {openDropdown === "add" && <div className="dropdown"><AddBookComponent /></div>}
            </div>
            
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>EDIT</th>
                    </tr>
                </thead>
                <tbody>
                    {books.result?.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>edit</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default Admin