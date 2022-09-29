const express = require("express");
const router = express.Router();
const postController = require("../Controllers/postController");

//ROUTES
router.route("/createPost").post(postController.createPost);

router.route("/all").get(postController.getAllPost);



module.exports = router;
