const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");

//ROUTES FOR AUTH AND USERS
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/activate").post(authController.activate);
router.route("/activateacc").post(authController.activateAccount);
router.route("/all").get(userController.getAllUser);
router.route("/usercreate").post(userController.createUser);
router.route("/remove/:id").delete(userController.removeUserById);
router.route("/followingList/:id").put(userController.updateFollowingById);
router.route("/followersList/:id").put(userController.updateFollowersById);

module.exports = router;
