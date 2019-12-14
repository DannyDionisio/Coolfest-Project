const express = require("express");
const router = express.Router();
const Event = require("../models/event");

// const bcrypt = require("bcrypt");
// const bcryptSalt = 10;

router.get("/create-event", (req, res, next) => {
  res.render("create-event");
});

router.post("/create-event", (req, res, next) => {
  const {
    type, Date,capacity, place, contacts, recipe, comment
  } = req.body;
  Event.create({
    type, Date,capacity, place, contacts, recipe, comment
  })
    .then(() => {
      res.redirect("/user");
    })
    .catch(next);
});

module.exports = router;
