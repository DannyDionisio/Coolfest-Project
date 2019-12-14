'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  res.render('user', { name: 'James Dean' });
});

router.get("/create-event", (req, res, next) => {
  res.render("create-event");
});


module.exports = router;
