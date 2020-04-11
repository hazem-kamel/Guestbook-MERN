const express = require("express");
const user = express.Router();
const passport = require("passport");
const sessionizeUser = require("../Session/Session");
const SESS_NAME = "sid";

//login
user.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    // If this function gets called, authentication was successful.
    if (err) {
      res.json({ error: "Username or password is not correct!" });
    }
    const sessionUser = sessionizeUser(user);
    if (user) {
      req.session.user = sessionUser;
      res.send(req.session);
    } else {
      res.json({ error: "Username or password is not correct!" });
    }
  })(req, res, next);
});

//logout
user.delete("/login", ({ session }, res) => {
  try {
    const user = session.user;
    if (user) {
      session.destroy((err) => {
        if (err) throw err;
        res.clearCookie(SESS_NAME);
        res.send(user);
      });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    res.status(422).send(err);
  }
});

module.exports = user;
