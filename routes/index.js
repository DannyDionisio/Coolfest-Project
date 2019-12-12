"use strict";

const { Router } = require("express");
const router = new Router();

router.get("/", (req, res, next) => {
  res.render("index", { title: "Coolfest" });
});

module.exports = router;

//router.get("/", (req, res, next) => {
//  fetch(
//    "https://api.spoonacular.com/recipes/search?apiKey=4bbde67ea47345b69767d4d3093f0fe5&number=5"
//  )
//    .then(response => response.json())
//    .then(response => {
//      res.render("index", { title: "Coolfest", recipies: response.results });
//    });
//});