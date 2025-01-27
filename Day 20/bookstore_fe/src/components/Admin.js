import React  from 'react'


function Admin() {
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

    
    
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button>RENT OUT</button>
            <button>Return Book</button>
            <button>Add a book</button>
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
                        <th>EDIT</th>
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
                            <td>edit</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default Admin