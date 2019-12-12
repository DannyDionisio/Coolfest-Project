const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
//const bcryptSalt = 10;

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", (req, res, next) => {
  const { user, password } = req.body;

  User.findOne({
    username
  })
    .then(user => {
      //login
      if (bcrypt.compareSync(password, user.get("password"))) {
        res.render("auth/login");
      }
  })
      //wrong password
    .catch(next);
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  User.create({ username, password: bcrypt.hashSync(password, 5)
  })
    .then(() => {
      res.redirect("auth/login")
    })
    .catch(next);
});

module.exports = router;
