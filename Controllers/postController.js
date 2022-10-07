const Post = require("../Models/postModel");
const LikeAndComment = require("../Models/likecommentModel");
const catchAsync = require("../utils/catchAsync");
const User = require("../Models/userModel");
const fileUpload = require('../utils/fileupload')

exports.createPost = catchAsync(async(req, res, next) => {
  
  const newPost = await Post.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      post: newPost,
    },
  });
});

exports.createPhoto = catchAsync(async(upload.array('images',2 )),(req,res)=>{
      console.log(req.files);
      res.send('multiple file upload success')
  })
  
// exports.postPhoto = catchAsync(async(upload.array('images', 2)), (req, res, next) => { 
//   await fileUpload({
//     photo:req.body.photo
//   })
//   console.log(req.files);
//   res.status(200).json({
//     status: "success",
//     message:'multiple file upload success'
//   })
// })

// exports.createPhoto = catchAsync(async (upload.array('images', 2)),(req, res, next) => {
//   console.log(req.files);
//   // let image = [];   
  
//    const upload = await fileUpload();
//   const post = await Post.create({
//     user: req.user.id,
//     image: image,
//     ...req.body,
//   })

//   res.status(201).json({
//     status: 'success',
//     post,
//     upload
//   });
// });
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
