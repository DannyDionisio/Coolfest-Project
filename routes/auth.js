const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const multer  = require('multer');
const Picture = require('../models/picture');
//const bcryptSalt = 10;

// ------login-----
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
        res.redirect("/auth/profile");
      }
    })
    //wrong password
    .catch(next);
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


router.get("/profile", (req, res, next) => {
  res.render("auth/profile");
});

//     {/*something here*/} /// then(users) //   // .then( user => {

//   })
// });


router.post('/user/:id', (req, res, next) => {
  const updatedUser = {
        name: req.body.name,
              email: req.body.email, 
        place: req.body.place,
        phone: req.body.phone, 
        Quote: req.body.Quote, 
        cooking_Skills: req.body.cooking_Skills,
        food_preferences: req.body.food_preferences
  };

  User.update({_id: req.params.id}, updatedUser)
    .then(() => {
      res.redirect('/auth/profile');
    })
    .catch((error) => {
      next(error);
    });
});

// Route to upload from the profile picture

router.get('/auth/profile', function(req, res, next) {
  Picture.find((err, pictures) => {
    res.render('profile', {pictures})
  })
});


const upload = multer({ dest: './public/uploads/' });

router.post('/upload', upload.single('photo'), (req, res) => {

  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save((err) => {
      res.redirect('/auth/profile');
  });
});










module.exports = router;





// -- edit events -- 
//GET EDIT PROFILE VIEW


//POST(?) EDIT Profile VIEW FORM



