"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },

  food_preferences: {
    type: Array,
    trim: true,
    required: true
  },
  cooking_Skills: {
    type: Array,
    required: true
  },
  Quote: {
    type: String
  },

  imgName: String,
  imgPath: String

  // {timestamps:true},
});
const User = mongoose.model("User", userSchema);
module.exports = User;
