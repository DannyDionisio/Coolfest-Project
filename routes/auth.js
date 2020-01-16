const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt"); // nunca alterar essa linha - Linha eduardo bcryptjs
const multer = require("multer");
const uploadCloud = require("../config/cloudinary.js");
// const bcryptSalt = 10;

// ------login-----
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});
router.post("/login", (req, res, next) => {
  const theUsername = req.body.username;
  const thePassword = req.body.password;

  if (theUsername === "" || thePassword === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, username and password to sign up."
    });
    return;
  }

  User.findOne({ name: theUsername })
    .then(user => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/auth/profile");
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect password"
        });
      }
    })
    .catch(error => {
      next(error);
    });
});

/// ------- Sign UP ------
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", uploadCloud.single("photo"), (req, res, next) => {
  console.log("body", req.body);
  const imgPath = req.file.url;
  const imgName = req.file.originalname;

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
    Quote,
    imgPath,
    imgName
  })
    .then(() => {
      console.log(">>>>>>");
      res.redirect("/auth/login");
    })
    .catch(err => {
      console.log("this is it", err);
    });
});

router.get("/profile", (req, res, next) => {
  console.log("user", req.session.currentUser);

  User.findById(req.session.currentUser._id)
    .then(o => {
      // console.log(o);
      res.render("auth/profile", { user: req.session.currentUser });
    })
    .catch(error => {
      next(error);
    });
});

//     {/*something here*/} /// then(users) //   // .then( user => {

//   })
// });

//UPDATE

router.get("/profile-edit", (req, res, next) => {
  // console.log("user", req.session.currentUser);

  User.findById(req.params.id)
    .then(o => {
      // console.log(o);
      res.render("auth/profile-edit", { user: req.session.currentUser });
    })
    .catch(error => {
      next(error);
    });
});

router.post("/profile-edit", (req, res, next) => {
  const updatedUser = {
    phone: req.body.phone,
    Quote: req.body.Quote,
    cooking_Skills: req.body.cooking_Skills,
    food_preferences: req.body.food_preferences
    // imgPath,
    // imgName
  };
  console.log("curren userrrr", req.session.currentUser, updatedUser);
  User.updateOne({ _id: req.session.currentUser._id }, updatedUser)
    .then(() => {
      console.log("id updating", req.session.currentUser._id);
      res.redirect("/auth/profile");
    })
    .catch(error => {
      next(error);
    });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    res.redirect("/login");
  });
});

module.exports = router;

// -- edit events --
//GET EDIT PROFILE VIEW

//POST(?) EDIT Profile VIEW FORM
