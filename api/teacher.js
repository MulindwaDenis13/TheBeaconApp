const router = require("express").Router();
const conn = require("../database/mysql");

router.get("/courses/:id", (req, res) => {
  conn.query(
    `
    SELECT * FROM courses_table 
        JOIN classes_table ON 
        classes_table.class_id = courses_table 
        WHERE teacher_id = ${req.params.id}`,
    (error, result) => {
      if (error) {
        res.send([]);
        throw error;
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
