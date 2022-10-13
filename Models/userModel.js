const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    // unique: true,
  },
  fullName: {
    type: String,
    required: true,
    //own validators
    // validate: [validator.isAlpha, "User name must only contains alphabets"],
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "User must have a emailId"],
    //validator
    validate: [validator.isEmail, "please provide a valid emailId"],
  },
  mobileNumber: {
    type: Number,
  },
  password: {
    type: String,
    unique: true,
    required: [true, "User must have a password"],
    unique: [true, "User must have unique password"],
    minLength: 8,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  accountType: {
    type: String,
    default: "Public",
  },

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
