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
  login: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  age: Number,
  booksOnHand: Array,
  profilePicture: Buffer
});

const User = mongoose.model("User", userSchema);

const bookSchema = mongoose.Schema({
  tittle: String,
  year: Number,
  bookAthour: String,
  bookDiscription: String,
  bookBookedBy: String,
  bookOnHandAt: String,
  bookPicture: Buffer,
  comments: Array
});

const Book = mongoose.model("Book", bookSchema);

module.exports = {
  mongoose,
  User,
  Book
};
