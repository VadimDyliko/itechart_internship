const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const {
  dbUrl
} = require('../config/constants.js')

mongoose
  .connect(dbUrl.url)
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
  bookingBooks: Array,
  profilePicture: Buffer,
  su: Boolean,
  isBan: Boolean,
  ban: {
    reason: String,
    date: String,    
  }
});

const User = mongoose.model("User", userSchema);

const bookSchema = mongoose.Schema({
  title: String,
  year: String,
  bookAthour: String,
  bookDiscription: String,
  bookBookedBy: Array,
  bookOnHandAt: Array,
  bookPicture: Buffer,
  comments: Array,
  count: Number,
  availableCount: Number
});

const Book = mongoose.model("Book", bookSchema);


module.exports = {
  mongoose,
  User,
  Book,
};
