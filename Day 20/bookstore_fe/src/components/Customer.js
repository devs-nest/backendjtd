import React, {useEffect, useState} from 'react'
import axios from 'axios';

function Customer() {
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get('http://localhost:3001/api/books/get', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setBooks(response.data.books);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchData();
    }, []);

    
    if(books){
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
    else{
        return <div>NO BOOKS</div>
    }
   

}

export default Customer