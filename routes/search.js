"use strict";

const { Router } = require("express");
const router = new Router();

router.get("/", (req, res, next) => {
  res.render("search");
});

router.post("/", (req, res, next) => {
  res.render("search");
});

router.get("/event-detail", (req, res, next) => {
  res.render("event-detail");
});

module.exports = router;
