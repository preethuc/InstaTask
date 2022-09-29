const User = require("../Models/userModel");
const Profile = require("../Models/profileModel");
const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/AppError");

//create profile after login
exports.createProfile = catchAsync(async (req, res, next) => {
  const newProfile = await Profile.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      profile: newProfile,
    },
  });
});

exports.editProById = catchAsync(async (req, res, next) => {
  const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    message: "profile updated",
    data: {
      profile,
    },
  });
});

// exports.getProfile = catchAsync(async (req, res, next) => {
//     const profile = await Profile.find().populate("followers")
    

// })