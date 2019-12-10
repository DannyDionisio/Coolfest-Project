const express = require("express");
const router = express.Router();
const User = require("../models/user");

// const bcrypt = require("bcrypt");
// const bcryptSalt = 10;

router.get("/", (req, res, next) => {
  res.render("create-event");
});

module.exports = router;