const postgres = require("postgres");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const pool = require("./db");
const bodyParser = require("body-parser");

const app = express();

//--------------------------------------MIDDLEWARE--------------------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//--------------------------------------ROUTES-----------------------------------------------------------------------
//Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("successfully authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});
app.post("/register", async (req, res) => {
  try {
    const user = await pool.query(`SELECT * FROM users WHERE userName = $1`, [
      req.body.username,
    ]);
    if (user.rows.length == 0) {
      const passwordHashed = await bcrypt.hash(req.body.password, 10);
      await pool.query(
        `INSERT INTO users(userName,passwordHash) VALUES($1,$2)`,
        [req.body.username, passwordHashed]
      );
      res.send("User Created");
    } else {
      res.send("User Already Exists");
    }
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/getUser", (req, res) => {
  res.send(req.user);
});
app.listen(5000, () => {
  console.log("Server has started");
});
