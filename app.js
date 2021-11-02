const express = require("express");
const router = express.Router();
const app = express();
const port = 3000;
const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "interview",
});
app.get("/", (req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    let sql = "select * from user";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
      oldRes = result;
      console.log(result);
    });
  });
});
app.post("/", function (req, res) {
  id = req.query.id;
  user = req.query.username;
  email = req.query.email;
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    let sql =
      "insert into user (id,username,email) values ('" +
      id +
      "','" +
      user +
      "','" +
      email +
      "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
    let sqlget = "select * from user";
    con.query(sqlget, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.listen(3000, function () {
  console.log("Listening on port 3000!");
});
