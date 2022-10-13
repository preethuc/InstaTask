const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postName: {
    type: String,
  },
  image: {
    type: String,
    require: true,
  },
  commentAndLike: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LikeAndComment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  caption: {
    type: String,
  },
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
