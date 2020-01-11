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
  // console.log("getting events");
  Event.find()
  .then(allEventFromDB => { // <- Backend requesting data from Mongo (DB) 
    // console.log("got events", allEventFromDB)
    res.render('events', { events: allEventFromDB }); 
    //^ Backend is responding to the front end with the data 
    // that was got from Mongo
  })
  .catch(error => {
    next(error);
  });
});


router.get("/events/create-event", (req, res, next) => {
  axios
    .get(
      "https://api.spoonacular.com/recipes/search?apiKey=4bbde67ea47345b69767d4d3093f0fe5"
    )
    .then(result => {
      res.render("create-event", { recipes: result.data.results });
    });
});




//show event when on click 

router.get('/events/:id', (req, res, next) => {
  Event.findById(req.params.id)
    .then(event => {
      res.render('event-show', { event });
    })
    .catch(error => {
      next(error);
  });
});


//update event 

router.get('/events/:id/edit', (req, res, next) => {
  Event.findOne({_id: req.params.id})
  // axios
  //   .get(
  //     "https://api.spoonacular.com/recipes/search?apiKey=4bbde67ea47345b69767d4d3093f0fe5"
  //   )
  // console.log("this is the req", Event.findById(req.params.id))

  .then(event => {
    res.render('event-edit', {event});
  })
  .catch(error => {
    console.log(">>>>>>>>>>>>>", error)
    next(error);
  });
});

router.post('/events/:id/edit', (req, res, next) => {
  const updatedEvent = {
        title: req.body.title,
        date: req.body.date, 
        capacity: req.body.capacity, 
        place: req.body.place,
        contacts: req.body.contacts, 
        recipe: req.body.recipe, 
        comment: req.body.comment,
        
  };

  Event.update({_id: req.params.id}, updatedEvent)
    .then(() => {
      res.redirect('/events');
    })
    .catch((error) => {
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


module.exports = router;
