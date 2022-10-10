// const express = require("express");
// const multer = require("multer");
// const Post = require('../Models/postModel')
// const catchAsync = require('../utils/catchAsync')

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: fileStorageEngine });

// Route
// single image
// app.post('/api/single',upload.single('image'),(req,res)=>{
//     console.log(req.file);
//     res.send('single file upload success')
// })

//multiple images
// app.post('/api/multiple',upload.array('images',2 ),(req,res)=>{
//     console.log(req.files);
//     res.send('multiple file upload success')
// })


// exports.createPhoto = catchAsync(
//   (upload.array("images", 2)),
//   (req, res) => {
//     console.log(req.files);
//     res.send("multiple file upload success");
//   }
// );

// // module.exports = upload;


// exports.createPhoto = catchAsync(async(upload.array('images',2 )),(req,res)=>{
//       console.log(req.files);
//       res.send('multiple file upload success')
//   })

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
    // });/