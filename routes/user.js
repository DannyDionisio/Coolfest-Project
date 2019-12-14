'use strict';

const { Router } = require('express');
const router = new Router();
const Event = require("../models/event");

router.get('/', (req, res, next) => {
  res.render('user', { name: 'James Dean' });
});

router.get("/create-event", (req, res, next) => {
  res.render("create-event");
});

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
      console.log("title", title)
      res.redirect("/user");
    })
    .catch(next);
});

module.exports = router;
