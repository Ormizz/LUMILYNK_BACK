const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'LUMILYNK',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('Pool de connexions créé');

module.exports = db;