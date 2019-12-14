const express = require("express");
const router = express.Router();
const Event = require("../models/event");

// const bcrypt = require("bcrypt");
// const bcryptSalt = 10;

//router.get("/create-event", (req, res, next) => {
//  res.render("create-event");
//});

router.post("/create-event", (req, res, next) => {
  const { title, date, capacity, place, contacts, recipe, comment } = req.body;
  Event.create({
    title,
    date,
    capacity,
    place,
    contacts,
    recipe,
    comment
  })
    .then(event => {
      
      res.redirect("/user");
    })
    .catch(next);
});

module.exports = router;
