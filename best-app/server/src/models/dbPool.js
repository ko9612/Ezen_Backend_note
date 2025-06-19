const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "eduDB",
  user: "ezen",
  password: "1234",
  connectionLimit: 10,
});

module.exports = pool;
