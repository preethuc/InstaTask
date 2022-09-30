const express = require("express");
const router = express.Router();
const postController = require("../Controllers/postController");

//ROUTES
router.route("/createPost").post(postController.createPost);
router.route("/allPost").get(postController.getAllPost);
router.route("/comment").post(postController.createComment);
router.route("/msg").get(postController.getcomment);

module.exports = router;
