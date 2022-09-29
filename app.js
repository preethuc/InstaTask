const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./Controllers/errorContoller");
const app = express();

const userRoute = require("./Routes/userRoute");

//MIDDLEWARE
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  console.log("middleware working..!");
  next();
});

app.use('/api/insta', userRoute)

//error handling function
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
