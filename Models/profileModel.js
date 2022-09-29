
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: false,
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: false,
    },
  ],
  bio: {
    type: String,
  },
});
const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
