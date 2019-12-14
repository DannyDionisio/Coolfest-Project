'use strict';

const express = require("express");
const router = express.Router();
const Event = require("../models/event");

//--- the list of the events ---
router.get('/', (req, res, next) => {
  res.render('events');
 });
//------CRIAR VIEWWW

 //--- create events --- 
 router.get('/create-event', (req, res, next) => {
  res.render('create-event');
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
      res.redirect("/");
    })
    .catch(next);
});


// -- edit events -- 
//GET EDIT EVENTS VIEW
//POST(?) EDIT EVENTS VIEW FORM

// -- delete event


module.exports = router;
