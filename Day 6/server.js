const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'jtd',
    password: '123',
    port: 5433,
});

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



















