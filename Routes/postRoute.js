const express = require("express");
const Post = require("../Models/postModel");

const router = express.Router();
const postController = require("../Controllers/postController");
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });
// const upload = multer({dest:'uploads/'})
router.post("/createPost",upload.single("image"),(req, res, next) => {
    const newPost = Post.create(req.body);
    console.log(req.file);
    // res.send('file uploaded successfully')
    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
});


//ROUTES
router.route("/allPost").get(postController.getAllPost);
router.route("/createmsg").post(postController.postCommentAndLike);
router.route("/getmsg").get(postController.getLikeAndComment);
router.route("/putmsg/:id").put(postController.updateLikeAndComment);



module.exports = router;
