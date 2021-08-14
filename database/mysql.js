const mysql = require("mysql8");

const MYSQL_CONFIG = {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "thebeacon_db",
};

const conn = mysql.createConnection(MYSQL_CONFIG);
conn.connect((err) => {
  if (err) throw err;
  console.log("Database connected....");
});

module.exports = conn;
