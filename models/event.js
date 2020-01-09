"use strict";

const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    trim: true,
    default: Date.now,
    required: true
  },
  capacity: {
    type: Number,
    trim: true,
    required: true,
    min: 1,
    max: 10
  },
  place: {
    type: String,
    required: true
  },
  contacts: {
    type: String,
    trim: true,
    required: true
  },
  recipe: {
    type: String,
    required: true
  },
  comment: String,
  imgName: String,
  imgPath: String
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
