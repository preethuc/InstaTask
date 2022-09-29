const express = require("express");
const router = express.Router();
const profileController = require("../Controllers/profileController");

//ROUTES
router.route("/create").post(profileController.createProfile);

// router.route("/all").get(profileController.getAllPro);
router.route("/edit").put(profileController.editProById)


module.exports = router;
