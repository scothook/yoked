const { Client } = require('pg');

// Connect using the DATABASE_URL environment variable
const client = new Client({
  //connectionString: process.env.MY_POSTGRES_URL,
  connectionString: 'postgresql://postgres:PXiODSlPjqEAZfATzAjMphVEsJUGvZTo@metro.proxy.rlwy.net:44272/railway',  // Make sure this is set correctly
});

//console.log(process.env.MY_POSTGRES_URL);
//console.log(MY_POSTGRES_URL);

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
