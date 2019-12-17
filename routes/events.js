'use strict';

const express = require("express");
const router = express.Router();
const Event = require("../models/event");


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
      res.redirect("/events");
    })
    .catch(next);
});


// -- edit events -- 
//GET EDIT EVENTS VIEW
//POST(?) EDIT EVENTS VIEW FORM

// -- delete event

router.post('/events/edit', (req, res, next) => {
  const { title, date, capacity, place, contacts, recipe, comment  } = req.body;
  Event.update({_id: req.query.events_id}, { $set: {title, date, capacity, place, contacts, recipe, comment }})
  .then((event) => {
    res.redirect('/events');
  })
  .catch((error) => {
    console.log(error);
  })
});


module.exports = router;
