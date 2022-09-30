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
  const users = await User.find().populate("following");
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
//put followers by User by id
exports.updateFollowingById = catchAsync(async (req, res, next) => {
  // let user = User.findById(req.body.following) //user = ben10
  User.findById(req.body.following).then(async (response) => {
    const theID = response._id;
    const Ben10 = response
    // console.log(Ben10);
    let following = Ben10.following;
    // console.log(typeof following);
    console.log(following)
    following.push(req.body.following);
    // console.log(req.body.following);
    console.log(following);
    User.findByIdAndUpdate(theID, following, { new: true }).then(resolve => {
      console.log(resolve);
    });
    // console.log(updatedOne);
  });

  // let followList = user.followList;
  // console.log(req.body.following);
  // followList = followList
  // console.log(user);
  // let following = user.following
  // console.log(typeof following);
  // following = following.push(req.body.following)

  // .populate("User", "_id")
  // .exec();
  res.status(200).json({
    status: "success",
    data: {
      message: "updated"
    },
  });
});
