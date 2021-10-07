const router = require("express").Router();
const conn = require("../database/mysql");

router.post("/login", async (req, res) => {
  conn.query(
    `SELECT * FROM users_table WHERE username = ? AND user_password = ?`,
    [req.body.username, req.body.password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ status: false });
      } else {
        result.length == 0
          ? res.send({ status: false })
          : res.send({ status: true, user: result[0] });
      }
    }
  );
});
router.get("/users", async (req, res) => {
  conn.query(`SELECT * FROM users_table`, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: false });
    } else {
      res.send(result);
    }
  });
});
router.post("/new_user", async (req, res) => {
  let {
    surname,
    first_name,
    username,
    email,
    gender,
    phone_contact,
    role,
    password,
    confirm_password,
  } = req.body;
  conn.query(
    `SELECT * FROM users_table WHERE username = ?`,
    [username],
    (err1, res1) => {
      if (err1) {
        console.log(err1);
        res.send({ data: "An Error Occurred", status: false });
      } else {
        if (res1.length > 0) {
          res.send({ data: "Username Already Taken", status: false });
        } else {
          if (password !== confirm_password) {
            res.send({ data: "Passwords Do not Match", status: false });
          } else {
            if (password.length < 5) {
              res.send({
                data: "Password Should be atleast 5 characters",
                status: false,
              });
            } else {
              conn.query(
                `INSERT INTO users_table SET ?`,
                {
                  user_surname: surname,
                  user_first_name: first_name,
                  user_phone: phone_contact,
                  username: username,
                  user_email: email,
                  user_role: role,
                  user_gender: gender,
                  user_password: password,
                },
                (err2, res2) => {
                  if (err2) {
                    console.log(err2);
                    res.send({ data: "An Error In Service", status: false });
                  } else {
                    res.send({
                      data: "User Added Successfully",
                      status: true,
                    });
                  }
                }
              );
            }
          }
        }
      }
    }
  );
});

router.post("/classes/new", (req, res) => {
  let { faculty, class_name } = req.body;
  conn.query(
    "INSERT INTO classes_table SET ?",
    {
      class_name,
      faculty,
    },
    (error, result) => {
      if (error) {
        res.send({ status: false, data: "An error In Service" });
        throw error;
      } else {
        res.send({ status: true, data: "Class Added SuccessFully..." });
      }
    }
  );
});

router.get("/classes", (req, res) => {
  conn.query("SELECT * FROM classes_table", (error, result) => {
    if (error) {
      res.send([]);
      throw error;
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
