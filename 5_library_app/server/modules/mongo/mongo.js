const mongoose = require("../../node_modules/mongoose");
const dbUrl =
  "mongodb+srv://libraryapp:supersecret@cluster0-vyplv.mongodb.net/users";

mongoose
  .connect(dbUrl)
  .then(
    () => console.log("<<<Successfully connected to MongoDB-Atlas>>>"),
    err => console.log(err)
  );

const userSchema = mongoose.Schema({
  email: String,
  password: String
  //profilePicture: Buffer
});

const User = mongoose.model("User", userSchema);

module.exports = { mongoose, User };
