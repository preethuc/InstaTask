const express = require("express");
const morgan = require("morgan");
const app = express();
const userRoute = require("./Routes/userRoute");
const postRoute = require("./Routes/postRoute");
const passport = require('passport')

// const globalErrorHandler = require("./Controllers/errorContoller");

//MIDDLEWARE
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use((req, res, next) => {
  console.log("middleware working..!");
  next();
});

app.use("/api/insta", userRoute, postRoute);

//error handling function
// app.all("*", (req, res, next) => {
//   next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
// });
// app.use(globalErrorHandler);

module.exports = app;
