const express = require("express");
const users = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Config/Register");
const session = require("../Session/Session");

users.post("/register", (req, res) => {
  const Today = new Date();
  let userData = new User({
    username: req.body.username,
    password: req.body.password,
    gender: req.body.gender,
    created: Today,
  });
  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      res.json({ error: "Username already Exists!" });
    }
  });
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    userData.password = hash;
    const sessionUser = session(userData);
    User.create(userData)
      .then((user) => {
        req.session.user = sessionUser;
        res.send(req.session);
      })
      .catch((err) => {
        res.send("error" + err);
      });
  });
});
module.exports = users;
