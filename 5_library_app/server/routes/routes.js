const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const { singUp, logIn, identityCheck } = require("../services/auth");
const { getBookCover, getBooks, getSingleBookCover } = require("../services/books");

const {Book, User} = require('../services/mongo');

router.post("/singup", upload.single("profilePicture"), (req, res) => {
  console.log(req.body);
  if (req.body.login && req.body.email && req.body.password) {
    singUp(req, res)
  } else {
    res.sendStatus(400);
  }
});


router.post("/login", (req, res) => {
  if (req.body.login && req.body.password) {
    logIn(req, res)
  }
});


router.get("/profile", passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  let payload = {
    login: req.user.login,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    booksOnHand: req.user.booksOnHand,
    profilePicture: req.user.profilePicture
  };
  res.json(payload);
});

router.get("/user/avatr/:userId", (req, res) => {
  sendStatus(200)
})

router.get("/books", (req, res) => {
  getBooks(req, res)
});


router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.sendStatus(200);
});


router.post("/identityCheck", (req, res) => {
  identityCheck(req, res)
});


router.get("/book/cover/:bookId", (req, res) => {
  getSingleBookCover(req, res)
})


router.get("/user/avatar/:userId", (req, res) => {
  //getSingleUserAvatar(req, res)
  console.log(req);
  console.log('************************************',req.params.userId);
  User.findById(req.params.userId)
  .then(user=>{
    res.set('Content-Type', 'image/jpeg');
    res.send(user.profilePicture)
  })
  .catch((err)=>console.log(err))
})

module.exports = router





// router.post('/bookAdd', upload.single("bookPicture"), (req,res)=>{
//   console.log(req.body);
//   console.log(req.file.buffer);
//   let newBook = new Book({
//     tittle: req.body.title,
//     year: req.body.year,
//     bookAthour: req.body.bookAthour,
//     bookDiscription: req.body.bookDiscription,
//     bookPicture: req.file.buffer,
//   })
//   newBook.save()
//   .then(()=>res.sendStatus(200))
//   .catch((err)=>console.log(err))
// })
