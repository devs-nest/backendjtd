import React, {useEffect, useState} from 'react'
import axios from 'axios';

function Customer() {
    // const [books, setBooks] = useState([]);
    const books = [{
        id:1,
        title: "X",
        description: "YY",
        dateRentedOut: 'XxXXXXX',
        dueDate: "YYYYYY",
        quanity: 2,
        price: 150
    },
    {
        id:1,
        title: "X",
        description: "YY",
        dateRentedOut: "ZZZZZ",
        dueDate: "AAAAA",
        quanity:4,
        price:170
    }]
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const token = localStorage.getItem('token');

    //         try {
    //             const response = await axios.get('http://localhost:3001/api/data/customerData', {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             });

    //             setData(response.data.books);
    //         } catch (error) {
    //             console.error('Error fetching customer data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    
    
    return (
        <div>
            <h2>Customer Dashboard</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date of Renting out</th>
                        <th>Due Date</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.dateRentedOut}</td>
                            <td>{item.dueDate}</td>
                            <td>{item.quanity}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default Customer