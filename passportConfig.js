const bcrypt = require("bcryptjs");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const pool = require("./db");

module.exports = function (passport) {
  passport.use(
    new localStrategy(async (username, password, done) => {
      try {
        const user = await pool.query(
          `SELECT * FROM users WHERE userName = $1`,
          [username]
        );
        if (user.rows.length == 0) {
          // NO MATCH
          return done(null, false); //null = err, false = user
        } else {
          //MATCH
          bcrypt.compare(password, user.rows[0].passwordhash, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.rows[0].user_id);
  });
  passport.deserializeUser(async (id, cb) => {
    const user = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [
      id,
    ]);
    const userInformation = {
      username: user.rows[0].username,
    };
    cb(null, userInformation);
  });
};
