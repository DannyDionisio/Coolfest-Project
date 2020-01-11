"use strict";

const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const axios = require("axios");
const uploadCloud = require("../config/cloudinary.js");



//------CRIAR VIEWWW

//--- create events ---
/*router.get("/events/create-event", (req, res, next) => {
  axios
    .get(
      "https://api.spoonacular.com/recipes/search?apiKey=4bbde67ea47345b69767d4d3093f0fe5"
    )
    .then(result => {
      res.render("create-event", { recipes: result.data.results });
    });
});
*/

router.post("/create-event", uploadCloud.single('photo'), (req, res, next) => {
  const { title, date, capacity, place, contacts, recipe, comment } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;

  Event.create({
    title,
    date,
    capacity,
    place,
    contacts,
    recipe,
    comment,
    imgName, 
    imgPath
  })
    .then(event => {
      res.redirect("/events");
    })
    .catch(next);
});


// router.get('/events/:id/edit', (req, res, next) => {
//   Event.findById(req.params.id)
//   console.log("this is the req", req.params.id)
//   .then(event => {
//     console.log("this is the event", event)
//     res.render('event-edit', {event});
//   })
//   .catch(error => {
//     console.log(">>>>>>>>>>>>>", error)
//     next(error);
//   });
// });



// router.post("/events/event-edit", (req, res, next) => {
//   const { title, date, capacity, place, contacts, recipe, comment } = req.body;
//   Event.update(
//     { _id: req.query.events_id },
//     { $set: { title, date, capacity, place, contacts, recipe, comment } }
//   )
//     .then(event => {
//       res.redirect("/events");
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

module.exports = router;
