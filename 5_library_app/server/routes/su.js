const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});
const {suFetchBookData, suHandOutBook, suCancelBook, suReturnBookFromHands, suReturnToBookStatus, deleteComment} = require("../services/su");
const {  decrementAvailableCount, incrementAvailableCount, getBooks} = require("../services/books")
const {  Book } = require("../services/mongo")


router.get("/fetchBookData/:bookId", passport.authenticate("jwtSU", {
  session: false
}), (req, res) => {
  suFetchBookData(req, res)
})


router.post("/handout", passport.authenticate("jwtSU", {
  session: false
}), (req, res) => {
  suHandOutBook(req.body.userId, req.body.bookId, res)
    .then(()=>res.sendStatus(200))
})


router.post("/cancelBook", passport.authenticate("jwtSU", {
  session: false
}), (req, res) => {
  suCancelBook(req.body.userId, req.body.bookId, res)
    .then(()=>incrementAvailableCount(req.body.bookId))
    .then(()=>res.sendStatus(200))
})


router.post("/returntobookstatus", passport.authenticate("jwtSU", {
  session: false
}), (req, res) => {
  suReturnToBookStatus(req.body.userId, req.body.bookId, res)
    .then(()=>res.sendStatus(200))
})


router.post("/deletecomment", passport.authenticate("jwtSU", {
  session: false
}), (req, res) => {
  deleteComment(req.body.bookId, req.body.commentId)
  res.sendStatus(200)
})

router.post('/bookadd', passport.authenticate("jwtSU", {
  session: false
}), upload.single("coverImage"), (req,res)=>{
  let newBook = new Book({
    title: req.body.title,
    year: req.body.year,
    bookAthour: req.body.bookAthour,
    bookDiscription: req.body.bookDiscription,
    bookPicture: req.file.buffer,
  })
  newBook.save()
  .then(()=>res.sendStatus(200))
  .catch((err)=>console.log(err))
})


router.get('/fetchbooksformanage/:filter', passport.authenticate("jwtSU", {
  session: false
}), (req, res)=> {
    let exp
    console.log(req.params.filter);
    switch (req.params.filter) {
      case 'booked':
      console.log(123);
      exp = {bookBookedBy:{ $gt: [] }};
      break;
      case 'on hands':
      exp = {bookOnHandAt:{ $gt: [] }};
      break;
      default:
      exp = {};
    }
    console.log(exp);
      Book.find(exp)
      .then(books=>books.map(book=>{
          return newBook = {
            _id: book._id,
            title: book.title,
            year: book.year,
            bookAthour: book.bookAthour,
            bookBookedBy: book.bookBookedBy,
            bookOnHandAt: book.bookOnHandAt,
            availableCount: book.availableCount
          }
        }))
      .then(books=>res.json(books))
})

module.exports = router
