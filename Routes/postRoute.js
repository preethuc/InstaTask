const express = require("express");
const router = express.Router();
const postController = require("../Controllers/postController");

//ROUTES
router.route("/createPost").post(postController.createPost);
router.route("/allPost").get(postController.getAllPost);
router.route("/createmsg").post(postController.postCommentAndLike);
router.route("/getmsg").get(postController.getLikeAndComment);
router.route("/putmsg/:id").put(postController.updateLikeAndComment);
router.route("/createphto").post(postController.createPhoto);


module.exports = router;
