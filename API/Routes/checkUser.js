const express = require("express");
const checkUser = express.Router();
const User = require("../Config/Register");
checkUser.post("/check", (req, res) => {
  User.findOne({
    username: req.body.username,
  }).then((user) => {
    if (!user) {
      res.json({ error: "User is not registered!" });
    } else {
      res.send(user.username);
    }
  });
});
module.exports = checkUser;
