const express = require("express");
const morgan = require("morgan");
// const globalErrorHandler = require("./Controllers/errorContoller");
const app = express();

const userRoute = require("./Routes/userRoute");
const profileRoute = require("./Routes/profileRoute");
const postRoute = require("./Routes/postRoute");


//MIDDLEWARE
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  console.log("middleware working..!");
  next();
});

app.use("/api/insta", userRoute,postRoute,profileRoute);
// app.use("/api/insta", profileRoute);
// app.use("/api/insta", postRoute);


// //error handling function
// app.all("*", (req, res, next) => {
//   next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
// });
// app.use(globalErrorHandler);

module.exports = app;
 