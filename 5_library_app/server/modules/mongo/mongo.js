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

// let newUser = new User({
//   email: "coolMan@mail.com",
//   password: "superpsw"
// });
// newUser.save().then(() => res.sendStatus(200), err => res.send(err));
