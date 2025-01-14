const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'jtd_5',
    password: '123',
    port: 5433, //5432
});


// const runningQueries = async () =>{
//     // try{
//         await client.connect()
//         const result = await client.query("Select * from customers where cust_id = 105;")
//         console.log(result.rows);
//         client.end()
//     // }
    
// }


const runQuery = async () => {
    try {
        await client.connect(); // Connect to the database
        const result = await client.query('SELECT * FROM users;'); // Raw SQL query
        console.log(result.rows); // Output the results
    } catch (err) {
        console.error('Error executing query', err.stack);
    } finally {
        await client.end(); // Close the connection
    }
};

runQuery();
