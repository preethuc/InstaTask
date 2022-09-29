const User = require("../Models/userModel");
const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/AppError");


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
  
  