const User = require("../Models/userModel");
const catchAsync = require("../utils/catchAsync");

//POST - CREATING USER
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

//GET - ALL USERS
exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find()
    .populate("following", "userName")
    .populate("followers", "userName");
  // const users = await User.find()
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

// PUT - FOLLOWING BY USER BY ID
exports.updateFollowingById = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const user = await User.findById(user_id).exec();
    let following = user.following;
    if (user) {
      following.push(req.body.following);
      User.findByIdAndUpdate(
        user_id,
        { following: following },
        { new: true },
        function (err, docs) {
          if (err) {
            console.log(err);
            return res.json({
              success: true,
              message: err.message,
            });
          } else {
            return res.json({
              success: true,
              message: "Following Added successfully",
              user: docs,
            });
          }
        }
      );
    }
  } catch (e) {
    console.log(e);
    return res.json({ success: false, message: e.message });
  }
};

// PUT - FOLLOWERS BY USER BY ID
exports.updateFollowersById = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const user = await User.findById(user_id).exec();
    console.log(user);
    let followers = user.followers;
    console.log(followers);

    if (user) {
      followers.push(req.body.followers);
      console.log(followers);
      User.findByIdAndUpdate(
        user_id,
        { followers: followers },
        { new: true },
        function (err, docs) {
          if (err) {
            console.log(err);
            return res.json({
              success: true,
              message: err.message,
            });
          } else {
            return res.json({
              success: true,
              message: "Follower Added successfully",
              user: docs,
            });
          }
        }
      );
    }
  } catch (e) {
    console.log(e);
    return res.json({ success: false, message: e.message });
  }
};

//DELETE - USER BY ID
exports.removeUserById = catchAsync(async (req, res, next) => {
  const users = await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "deleted",
  });
});
