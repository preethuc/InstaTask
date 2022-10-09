const express = require("express");
const multer = require("multer");
const Post = require('../Models/postModel')

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

exports.createPhoto = catchAsync(
  async(upload.array("images", 2)),
  (req, res) => {
    console.log(req.files);
    res.send("multiple file upload success");
  }
);

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

// module.exports = upload;
