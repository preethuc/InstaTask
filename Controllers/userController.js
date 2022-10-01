const User = require("../Models/userModel");
const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/AppError");

//create User
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    message: "User created",
    data: {
      user: newUser,
    },
  });
});

//get Users
exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find().populate("following", "userName").populate("followers","userName");
  // const users = await User.find()
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

//delete user
exports.removeUserById = catchAsync(async (req, res, next) => {
  const users = await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    // data: null,
    message: "deleted",
  });
});
//put following by User by id
exports.updateFollowingById = catchAsync(async (req, res, next) => {
  User.findById(req.body.following).then(async (response) => {
    let followingArray = response.following;
    // console.log('the following array with followingID: ', followingArray);
    followingArray.push(req.body.following)
    // console.log('the following array after push', followingArray);
    User.findByIdAndUpdate(
      req.params.id,
      { following: followingArray },
      { new: true }
    ).then((resolve) => {
      res.status(200).json({
        status: "success",
        data: {
          message: "updated",
          updatedData:resolve
        },
      });
      // console.log('the updated data from findbyidANDupdate: ', resolve);
    });
  });
});

//put followers by User by id
exports.updateFollowersById = catchAsync(async (req, res, next) => {
  User.findById(req.body.followers).then(async (response) => {
    let followersData = response.followers;
    followersData.push(req.body.followers);

    // console.log(req.params.id);
    User.findByIdAndUpdate(
      req.params.id,
      { followers: followersData },
      { new: true }
    ).then((resolve) => {
      console.log(resolve);
      res.status(200).json({
        status: "success",
        data: {
          message: "updated",
          updatedData:resolve
        },
      });
    });
  });
});
