"use strict";

const { Router } = require("express");
const router = new Router();
const axios = require('axios');
const Event = require("../models/event");

router.get("/", (req, res, next) => {
  res.render("index", { title: "Comeal" });
});

//--- the list of the events ---
router.get('/events', (req, res, next) => {
  console.log("getting events");
  Event.find()
  .then(allEventFromDB => { // <- Backend requesting data from Mongo (DB) 
    console.log("got events", allEventFromDB)
    res.render('events', { events: allEventFromDB }); 
    //^ Backend is responding to the front end with the data 
    // that was got from Mongo
  })
  .catch(error => {
    next(error);
  });
});

module.exports = router;

//router.get("/", (req, res, next) => {
//  fetch(
//    "https://api.spoonacular.com/recipes/search?apiKey=4bbde67ea47345b69767d4d3093f0fe5&number=5"
//  )
//    .then(response => response.json())
//    .then(response => {
//      res.render("index", { title: "Comeal", recipies: response.results });
//    });
//});