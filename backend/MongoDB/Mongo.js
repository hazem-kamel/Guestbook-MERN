const mongoose = require("mongoose");

const URI =
  "mongodb+srv://guestbook:123456h@cluster0-1vimh.mongodb.net/test?retryWrites=true&w=majority";
const connectDB = async () => {
  //mongoose to deal with the DB
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Database Connected...");
};
module.exports = connectDB;
