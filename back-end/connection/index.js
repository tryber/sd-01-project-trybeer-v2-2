const path = require('path');
const mysql = require('mysql');

const enviromentVariable = path.resolve(__dirname, '..', '..', '.env');

require('dotenv').config({ path: enviromentVariable });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao MySQL!');
});

module.exports = connection;
