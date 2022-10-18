// const express = require("express");
// const app = express();
// const cors = require("cors");
// const morgan = require("morgan");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const { hashSync } = require("bcrypt");
// const User = require("./userModel");
// const passport = require("passport");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));
// app.use(cors());
// app.use(passport.initialize());

// require("./passport");

// //REGISTER
// app.post("/register", (req, res) => {
//   const user = new User({
//     userName: req.body.userName,
//     password: hashSync(req.body.password, 10),
//   });
//   user
//     .save()
//     .then((user) => {
//       res.status(201).json({
//         status: "success",
//         message: "created successfully",
//         user: {
//           id: user._id,
//           userName: user.userName,
//           password: user.password,
//         },
//       });
//     })
//     .catch((err) => {
//       res.status(400).json({
//         status: "fail",
//         message: "something went wrong",
//         error: err,
//       });
//     });
// });

// //LOGIN - Create TOKEN
// app.post("/login", (req, res) => {
//   User.findOne({ userName: req.body.userName }).then((user) => {
//     if (user) {
//       bcrypt.compare(req.body.password, user.password, (err, result) => {
//         if (result) {
//           const payload = {
//             userName: user.userName,
//             id: user._id,
//           };
//           const token = jwt.sign(payload, "secret-secret", { expiresIn: "2d" });
//           res.status(201).json({
//             status: "success",
//             message: "successfully logged IN",
//             user,
//             token: "Bearer " + token,
//           });
//         } else {
//           return res.status(404).json({
//             status: "fail",
//             message: "not a match",
//           });
//         }
//       });
//     } else {
//       res.status(404).json({
//         status: "fail",
//         message: "not found",
//       });
//     }
//   });
// });

// //GET - Authorization using passport
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
//   }
// );

// app.listen(3000, () => {
//   console.log(" listening on the port 3000");
// });
