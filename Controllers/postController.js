const Post = require('../Models/postModel')
const catchAsync = require('../utils/catchAsync')


exports.createPost = catchAsync(async (req, res, next) => {
     const newPost= await Post.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
})
exports.getAllPost = catchAsync(async (req, res, next) => {
    const post = await Post.find()
    res.status(200).json({
        status: 'success',
        results: post.length,
        data: {
          post,
        },
    })
})
