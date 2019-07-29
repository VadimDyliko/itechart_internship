const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});
const {suFetchBookData, suHandOutBook, suCancelBook, suReturnBookFromHands, suReturnToBookStatus} = require("../services/su");


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
    .then(()=>res.sendStatus(200))
})


router.post("/returntobookstatus", passport.authenticate("jwtSU", {
  session: false
}), (req, res) => {
  suReturnToBookStatus(req.body.userId, req.body.bookId, res)
    .then(()=>res.sendStatus(200))
})


module.exports = router
