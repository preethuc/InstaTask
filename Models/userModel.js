const mongoose = require("mongoose");
const validator = require("validator");
// const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    // unique: true,
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
  fullName: {
    type: String,
    required: true,
    //own validators
    // validate: [validator.isAlpha, "User name must only contains alphabets"],
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
    default:'Public'
},

  followersList: [
    {
      followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
    },
  ],

  //   timestamps: true
});
// //Hash password
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });
const User = mongoose.model("User", userSchema);

module.exports = User;
