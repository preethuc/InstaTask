const Post = require("../Models/postModel");
const LikeAndComment = require("../Models/likecommentModel");
const catchAsync = require("../utils/catchAsync");

//GET ALL THE POST
exports.getAllPost = catchAsync(async (req, res, next) => {
  const post = await Post.find()
    .populate("user", "userName")
    .populate("commentAndLike", "likeMessage commentMessage user_id");
  // .select("likeMessage commentMessage")
  res.status(200).json({
    status: "success",
    results: post.length,
    data: post,
  });
});

//POST - COMMENT AND LIKE
exports.postCommentAndLike = catchAsync(async (req, res, next) => {
  const newMessage = await LikeAndComment.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      Message: newMessage,
    },
  });
});

//GET - LIKE AND COMMENT
exports.getLikeAndComment = catchAsync(async (req, res, next) => {
  const message = await LikeAndComment.find()
    .populate("user_id", "userName")
    .populate("post_id", "postName");
  res.status(200).json({
    status: "success",
    results: message.length,
    CommentAndLike: message,
  });
});
//PUT - LIKE AND COMMENT
exports.updateLikeAndComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();
  console.log(post);
  let message = post.commentAndLike;
  console.log(message);

  if (post) {
    message.push(req.body.commentAndLike);
    // console.log(followers);
    Post.findByIdAndUpdate(
      req.params.id,
      { commentAndLike: message },
      { new: true },
      function (err, docs) {
        if (err) {
          console.log(err);
          return res.json({
            success: true,
            message: err.message,
          });
        } else {
          return res.json({
            success: true,
            message: "messages Added successfully",
            user: docs,
          });
        }
      }
    );
  }
});

