const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});
const {
  singUp,
  logIn,
  identityCheck,
  getUserAvatar,
  getProfile
} = require("../services/auth");
const {
  getBookCover,
  getBooks,
  getSingleBookCover,
  addComment
} = require("../services/books");


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
  getProfile(req, res)
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
  getUserAvatar(req, res)
})


router.post("/addcomment", passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  addComment(req, res)
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
