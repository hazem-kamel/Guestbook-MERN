const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// import User Model
const User = require("./Register");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      //match user "Username" if available in DB
      User.findOne({ username: username })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "That Username is not registered !",
            });
          }
          {
            //match the password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, {
                  message: "The password you entered is incorrect",
                });
              }
            });
          }
        })
        .catch((err) => console.log(err));
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
