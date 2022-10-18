const User = require("../Models/userModel");
const Otp = require("../Models/otpModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const passport = require("passport");

//signup
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  // const token = jwt.sign({ id: newUser._id }, "secretkey");

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
      message: "successfully Executed",
      // token,
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
  const otp = req.body.Otp;
  console.log(typeof otp);

  const checkOtpIsValid = await Otp.findOne({
    OtpInsta: otp,
    isAuthenticated: false,
  });
  // if (!checkOtpIsValid) {
  //   return next(new AppError("Invalid Otp", 400));
  // }
  checkOtpIsValid.isAuthenticated = true;
  await checkOtpIsValid.save();
  return res.status(200).json({
    status: "success",
    data: checkOtpIsValid,
  });
});
//post-activate
exports.activate = catchAsync(async (req, res, next) => {
  const isEmailVerified = await Otp.findOne({
    email: req.body.email,
    isAuthenticated: true,
  });
  console.log(isEmailVerified);
  if (!isEmailVerified) {
    return next(new AppError("Email is not verified", 400));
  }
  return res.status(201).json({
    status: "success",
    data: "Verified.Please login",
  });
});

//login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (password === user.password) {
    const payload = {
      email: user.email,
      id: user.id,
    };
    const token = jwt.sign(payload, "secret-secret", { expiresIn: "2d" });
    res.status(201).json({
      status: "success",
      message: "successfully logged IN",
      user,
      token: "Bearer " + token,
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "not found",
    });
  }
});

//GET - Authorization using passport
// app.get(
//   "/auth",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     return res.status(200).json({
//       status: "success",
//       message: "Authorization success",
//       user: {
//         id: req.user._id,
//         userName: req.user.userName,
//       },
//     });
//   })
