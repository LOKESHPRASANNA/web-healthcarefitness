const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool for better performance
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gym_website',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0
});

// Test the connection on startup
pool.getConnection()
  .then((connection) => {
    console.log('✅ MySQL Database Connected Successfully!');
    console.log(`📊 Database: ${process.env.DB_NAME || 'gym_website'}`);
    console.log(`🖥️  Host: ${process.env.DB_HOST || 'localhost'}`);
    connection.release();
  })
  .catch((err) => {
    console.error('❌ MySQL Connection Error:');
    console.error(`Error: ${err.message}`);
    console.error('\n📝 Make sure:');
    console.error('1. MySQL Server is running');
    console.error('2. Database credentials are correct in .env file');
    console.error('3. Database exists or will be created');
  });

module.exports = pool;
