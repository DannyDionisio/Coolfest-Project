'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true

  },
  data: {
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
  comment: {
    type: String
  }
});

module.exports = mongoose.model('User', schema);