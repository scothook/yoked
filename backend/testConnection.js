const { Client } = require('pg');
require('dotenv').config({ path: './.env' });


// Connect using the DATABASE_URL environment variable
const client = new Client({
  connectionString: process.env.YOKED_DATABASE_URL,
});
  async function testQuery() {
    try {
      await client.connect();
      console.log("✅ Successfully connected to database");
  
      // Use 'await' to handle async query
      const res = await client.query("SELECT * FROM teams");
      console.log("Database time:", res.rows[0]);
  
    } catch (err) {
      console.error("❌ Query error:", err);
    } finally {
      await client.end(); // Always close the connection
    }
  }
  
  testQuery();
