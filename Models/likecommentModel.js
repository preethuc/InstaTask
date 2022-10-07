const mongoose = require("mongoose");

const likeAndCommentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  likeMessage: {
    type: String,
    enum: ["Like", "dislike"],
    default: "Like",
  },
  commentMessage: {
    type: String,
  },
});

const LikeAndComment = mongoose.model("LikeAndComment", likeAndCommentSchema);

module.exports = LikeAndComment;
