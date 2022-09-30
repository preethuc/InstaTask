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
    const users = await User.find()
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    })
})

//delete user
exports.removeUserById = catchAsync(async (req, res, next) => {

  const users = await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    // data: null,
    message: "deleted",
  });
 
});
// //Get followers by User by id
// exports.getFollowListById = async (req, res, next) => {
 
//   const followUsers = await User.find({
//     _id: req.params.id,
//   })
//     .populate("followers", "_id")
//     .populate("following", "_id")
//     .exec();

//   res.status(200).json({
//     status: "success",
//     data: {
//       followUsers,
//     },
//   });

// };




