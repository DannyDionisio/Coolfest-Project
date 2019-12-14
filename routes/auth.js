const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
//const bcryptSalt = 10;
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});
router.post("/login", (req, res, next) => {
  const { name, password } = req.body;
  User.findOne({
    name
  })
    .then(user => {
      //login
      if (bcrypt.compareSync(password, user.get("password"))) {
        res.redirect("/");
      }
    })
    //wrong password
    .catch(next);
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const {
    name,
    password,
    email,
    phone,
    food_preferences,
    cooking_Skills,
    Quote
  } = req.body;
  User.create({
    name,
    password: bcrypt.hashSync(password, 5),
    email,
    phone,
    food_preferences,
    cooking_Skills,
    Quote
  })
    .then(() => {
      res.redirect("/auth/login");
    })
    .catch(err => {
      console.log(err);
    });
});


router.get('/', (req, res, next) => {
  res.render('user', { name: 'James Dean' });
});

module.exports = router;

// -- edit events -- 
//GET EDIT PROFILE VIEW
//POST(?) EDIT Profile VIEW FORM



