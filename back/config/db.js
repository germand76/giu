require('dotenv').config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    multipleStatements: true
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error conectando a la base de datos:', err.stack);
      return;
    }
  });
  
  module.exports = connection;