const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const multer = require("multer");
const uploadCloud = require('../config/cloudinary.js');
//const bcryptSalt = 10;

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

// router.get("/profile", (req, res, next) => {
//   res.render("auth/profile");
// });

router.get("/profile", (req, res, next) => {
  console.log("user", req.session.currentUser);

  User.findById(req.params.id)
    .then(o => {
      console.log(o);
      res.render("auth/profile", { user: req.session.currentUser });
    })
    .catch(error => {
      next(error);
    });
});

//     {/*something here*/} /// then(users) //   // .then( user => {

//   })
// });

router.post("/profile/:id", (req, res, next) => {
  const updatedUser = {
    name: req.body.name,
    email: req.body.email,
    place: req.body.place,
    phone: req.body.phone,
    Quote: req.body.Quote,
    cooking_Skills: req.body.cooking_Skills,
    food_preferences: req.body.food_preferences
  };

  User.update({ _id: req.params.id }, updatedUser)
    .then(() => {
      res.redirect("/auth/profile");
    })
    .catch(error => {
      next(error);
    });
});

// Route to upload from the profile picture

// router.get('/auth/profile', function(req, res, next) {
//   Picture.find((err, pictures) => {
//     res.render('profile', {pictures})
//   })
// });

const upload = multer({ dest: "./public/uploads/" });

router.post("/upload", upload.single("photo"), (req, res) => {
  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save(err => {
    res.redirect("/auth/profile");
  });
});

module.exports = router;

// -- edit events --
//GET EDIT PROFILE VIEW

//POST(?) EDIT Profile VIEW FORM



router.post('/auth/profile', uploadCloud.single('photo'), (req, res, next) => {
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newMovie = new Movie({imgPath, imgName})
  newMovie.save()
  .then(movie => {
    res.redirect('/auth/profile');
  })
  .catch(error => {
    console.log(error);
  });
});