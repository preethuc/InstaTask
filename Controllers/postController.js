const Post = require("../Models/postModel");
const LikeAndComment = require("../Models/likecommentModel");
const catchAsync = require("../utils/catchAsync");
const User = require("../Models/userModel");
// const multer = require("multer");

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {

//     cb(null, "./uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: fileStorageEngine });
// // const upload = multer({dest:'uploads/'})

// exports.createPost =
//   (upload.single("image"),
//   async (req, res, next) => {
//     const newPost = await Post.create(req.body);
//     console.log(req.file);
//     // res.send('file uploaded successfully')
//     res.status(201).json({
//       status: "success",
//       data: {
//         post: newPost,
//       },
//     });
    // const post = new Post({
    //   user: req.body.user,
    //   caption: req.body.caption,
    //   postName: req.body.postName,
    // });
    // res.status(201).json({
    //     status: "success",
    //     data: {
    //       post
    //     },
    //   });
  //});

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
exports.postCommentAndLike = catchAsync(async (req, res, next) => {
  const newMessage = await LikeAndComment.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      Message: newMessage,
    },
  });
});
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
//put comment and like by id
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

// exports.createComment = catchAsync(async (req, res, next) => {
//   const newComment = await Comment.create(req.body);
//   res.status(201).json({
//     status: "success",
//     data: {
//       comment: newComment,
//     },
//   });
// });

// exports.getcomment = catchAsync(async (req, res, next) => {
//   const comment = await Comment.find()
//     .populate("user_id", "userName")
//     .populate("post_id", "postName");
//   res.status(200).json({
//     status: "success",
//     results: comment.length,
//     comment: comment,
//   });
// });

// exports.postLike = catchAsync(async (req, res, next) => {
//   const newLike = await Like.create(req.body);
//   res.status(201).json({
//     status: "success",
//     data: {
//       like: newLike,
//     },
//   });
// });

// exports.getLike = catchAsync(async (req, res, next) => {
//   const like = await Like.find()
//     .populate("user_id", "userName")
//     .populate("post_id", "postName");
//   res.status(200).json({
//     status: "success",
//     results: like.length,
//     likes: like,
//   });
// });
