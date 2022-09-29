const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/Insta-Data');
mongoose.connection
  .once('open', () => {
    console.log('DB connected');
  })
  .on('error', (error) => {
    console.log('error is:', error);
  });                           

//Unhandled promise rejection--error outside express
//without connecting MongoDB
// process.on('unhandledRejection', err =>{
//   console.log(err.name,err.message)
//   console.log('U1NHANDLED REJECTION! , Shutting Down.....!')
//   server.close(() =>{
//     process.exit(1)
//   })
// })
//server
app.listen(3000, () =>
  console.log("Listening on the port 3000")
);
