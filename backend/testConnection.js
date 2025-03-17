const { Client } = require('pg');

// Connect using the DATABASE_URL environment variable
const client = new Client({
  connectionString: process.env.DATABASE_URL,  // Make sure this is set correctly
});

console.log(process.env.DATABASE_URL);


client.connect()
  .then(() => {
    console.log('Successfully connected to PostgreSQL');
    client.end(); // Close the connection after success
  })
  .catch((err) => {
    console.error('Connection error', err.stack);
  });
