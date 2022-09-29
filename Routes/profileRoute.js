const express = require("express");
const router = express.Router();
const profileController = require("../Controllers/profileController");

//ROUTES
router.route("/createProfile").post(profileController.createProfile);

router.route("/allPro").get(profileController.getProfile);
router.route("/edit").put(profileController.editProById);

module.exports = router;
