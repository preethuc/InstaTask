const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");

//ROUTES
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/activate").post(authController.activate);
router.route("/confirm").post(authController.activateAccount);


module.exports = router;



