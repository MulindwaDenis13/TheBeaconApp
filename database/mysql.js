const mysql = require("mysql8");

const MYSQL_CONFIG = {
  host: "104.198.133.80",
  user: "testing_user",
  password: "user",
  database: "testing_db",
};

const conn = mysql.createConnection(MYSQL_CONFIG);
conn.connect((err) => {
  if (err) throw err;
  console.log("Database connected....");
});

module.exports = conn;
