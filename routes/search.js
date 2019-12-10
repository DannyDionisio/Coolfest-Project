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

router.get("/create-event", (req, res, next) => {
  res.render("create-event");
});

router.post("/create-event", (req, res, next) => {
  res.render("create-event");
});

module.exports = router;
