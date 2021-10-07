const router = require("express").Router();
const conn = require("../database/mysql");

router.post("/new", (req, res) => {
  let { username, password } = req.body;
  conn.query(
    "INSERT INTO students_table SET ?",
    {
      student_username: username,
      student_password: password,
    },
    (err, result) => {
      if (err) {
        res.send("Not Inserted");
        throw err;
      } else {
        res.send("Inserted");
      }
    }
  );
});

module.exports = router;
