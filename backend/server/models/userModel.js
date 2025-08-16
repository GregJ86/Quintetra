const mongoose = require("mongoose");

//user schema/model
const newUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    email: {
      type: String,
      required: true,
      label: "email",
    },
    password: {
      required: true,
      type: String,
      min: 8
    },
    level: {
      type: Number,
      default: 1,
    },
    gold: {
      type: Number,
      default: 0,
    },
    highScore: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: "ace.png",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model('users', newUserSchema)