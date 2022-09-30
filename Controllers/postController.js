const Post = require("../Models/postModel");
const Comment = require("../Models/commentModel");
const catchAsync = require("../utils/catchAsync");
const user = require("../Models/userModel");

exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      post: newPost,
    },
  });
});
exports.getAllPost = catchAsync(async (req, res, next) => {
  const post = await Post.find().populate("user", "_id").populate("comment");
  res.status(200).json({
    status: "success",
    results: post.length,
    data: post,
  });
});
exports.createComment = catchAsync(async (req, res, next) => {
  const newComment = await Comment.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      comment: newComment,
    },
  });
});

exports.getcomment = catchAsync(async (req, res, next) => {
  const comment = await Comment.find()
    .populate("user_id", "userName")
    .populate("post_id", "postName");
  res.status(200).json({
    status: "success",
    results: comment.length,
    comment: comment,
  });
});
