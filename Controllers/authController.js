const User = require("../Models/userModel");
// const Profile = require("../Models/profileModel");
const Otp = require("../Models/otpModel");
// const Notifi = require("../Models/notifiModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const sendEmail = require("../utils/sendEmail")

//signup
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = jwt.sign({ id: newUser._id }, "secretkey");

  let otpForEmailVerification = parseInt(Math.random() * 1000000);
  console.log(otpForEmailVerification);
  console.log(typeof otpForEmailVerification);
  await Otp.create({
    email: req.body.email,
    OtpInsta: otpForEmailVerification,
  });

  const message = `Your verification code for Instagram application is ${otpForEmailVerification}.`;
  console.log(message);
  try {
    await sendEmail({
      email: req.body.email,
      subject: "Email Verification for Instagram ",
      message,
    });

    res.status(201).json({
      status: "success",
      message: "Token sent to email",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);

    return next(new AppError("Error sending email.Try again later" + err, 500));
  }
});
//Activate account
exports.activateAccount = catchAsync(async (req, res, next) => {
  
    const otp = req.body.Otp * 1;
    
  
    const checkOtpIsValid = await Otp.findOne({
        OtpInsta: otp,
      isAuthenticated: false
    });
    if (!checkOtpIsValid) {
      return next(new AppError("Invalid Otp", 400));
    }
    checkOtpIsValid.isAuthenticated = true;
    await checkOtpIsValid.save();
    return res.status(200).json({
      status: "success",
      data: checkOtpIsValid,
    });
  });
//post-activate
exports.activate = catchAsync(async (req, res, next) => {
  // const errors = validationResult(req);

  // //^Checking validation errors
  // if (!errors.isEmpty()) {
  //   return next(new AppError(errors.array()[0].msg, 400));
  // }
  const isEmailVerified = await Otp.findOne({
    email: req.body.email,
    isAuthenticated: true,
  });
  console.log(isEmailVerified);
  if (!isEmailVerified) {
    return next(new AppError("Email is not verified", 400));
  }
  // await Otp.deleteMany({
  //   email: req.body.email,
  // });

  // await User.create({
  //   email: req.body.email,
  //   password: req.body.password,
  // });

  return res.status(201).json({
    status: "success",
    data: "Verified.Please login",
  });
});

//login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email }).select("+password");

  const userProfile = Profile.find();
  if (password === user.password) {
    res.status(200).json({
      message: "WELCOME TO insta",
      The_Profile: userProfile,
    });
  } else {
    // return next(new AppError('Invalid Email or Password', 401))
    res.status(401).json({
      message: "Invalid Email or Password",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      message: "account created",
    },
  });
});
// //Authentication
// exports.protect = async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }
//   console.log(2, token);
//   if (!token) {
//     return next(
//       new AppError("You are not logged in.Please login to get access", 401)
//     );
//   }
// };

// //create profile after login
// const createProfile = async (id, email) => {
//   await Profile.updateMany({}, { followers: [], following: {} });

//   const profile = await Profile.findOne({
//     user: id,
//   });
//   if (!profile) {
//     const name = email.split("@")[0];
//     const profile = await Profile.create({
//       user: id,
//       username: name,
//     });
//     // await User.findByIdAndUpdate(id, { profile: _id })
//     return profile;
//   }
//   return profile;
// };
