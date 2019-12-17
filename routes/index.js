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

router.post('/events/:id/delete', (req, res, next) => {
  Event.findById(req.params.id)
  .then(event => {
    event.remove()
      .then(() => {
        res.redirect('/events');
      })
      .catch(error => {
        next(error);
      });
  });
});

// router.post('/events/:id', (req, res, next) => {
//   const updatedEvent = {
//         title: req.body.title,
//         date: req.body.date, 
//         capacity: req.body.capacity, 
//         place: req.body.place,
//         contacts: req.body.contacts, 
//         recipe: req.body.recipe, 
//         comment: req.body.comment,
//   };

//   Event.update({_id: req.params.id}, updatedEvent)
//     .then(() => {
//       res.redirect('/events');
//     })
//     .catch((error) => {
//       next(error);
//     });
// });



module.exports = router;
