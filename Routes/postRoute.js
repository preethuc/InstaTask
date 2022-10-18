const express = require("express");
const Post = require("../Models/postModel");
const router = express.Router();
const postController = require("../Controllers/postController");

const passport = require("passport");
require("../config/passport");

//MULTER -POST CREATION
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

//POST - CREATING  POST AND UPLOADING IMAGE BY MULTER
router.post("/createPost", upload.single("image"), async (req, res, next) => {
  try {
    const newPost = new Post({
      user: req.body.user,
      postName: req.body.postName,
      commentAndLike: req.body.commentAndLike,
      caption: req.body.caption,
    });

    if (req.file) {
      newPost.image = req.file.path;
    }

    await newPost.save();

    // res.send('file uploaded successfully')
    return res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

//ROUTES FOR POST AND LIKE&COMMENT
router
  .route("/allPost")
  .get(
    passport.authenticate("jwt", { session: false }),
    postController.getAllPost
  );
router.route("/createmsg").post(postController.postCommentAndLike);
router.route("/getmsg").get(postController.getLikeAndComment);
router.route("/putmsg/:id").put(postController.updateLikeAndComment);

module.exports = router;
