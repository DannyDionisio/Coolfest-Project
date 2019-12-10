'use strict';
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
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
    type: String, 
    trim: true,
    required: true,
    enum: ['burguer', 'italian', 'vegetarian', 'eggs','gluten'] 
  },
  cooking_Skills:{
    type: String,
    trim: true,
    required: true,
    enum: ['Professional Dish Washer', 'Jedi Chef', 'Wine Guy', 'I know how to fry an egg','Jedi Padawan'] 
  }, 
  Quote: {
    type: String,
    trim: true
  },
    // {timestamps:true}, 
});
const User = mongoose.model("User", userSchema);
module.exports = User;