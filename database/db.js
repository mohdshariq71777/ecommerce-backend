const { Pool } = require('pg');

const db = new Pool({
    user: 'postgres', // Replace with your PostgreSQL username
    host: 'localhost',         // Database host
    database: 'postgres',   // Your database name
    password: 'password', // Your PostgreSQL password
    port: 5433,                // Default PostgreSQL port
});
// db.query()

// Query function
// async function getUsers() {
//     try {
//         const res = await pool.query('SELECT * FROM users');
//         console.log(res.rows); // Log the data
//     } catch (err) {
//         console.error('Error executing query', err.stack);
//     } finally {
//         await pool.end(); // Close the connection
//     }
// }
module.exports=db;