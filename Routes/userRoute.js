
const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController")

//ROUTES
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/activate").post(authController.activate);
router.route("/activateacc").post(authController.activateAccount);
router.route("/all").get(userController.getAllUser);
router.route("/usercreate").post(userController.createUser);

module.exports = router;
//auth rte
