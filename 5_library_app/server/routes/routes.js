const express = require("express");
const router = express.Router();
const passport = require("passport");
const logger = require('../services/winston');
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
  addComment,
  getSingleBook,
  bookingBook,
  cancelBook,
  decrementAvailableCount,
  incrementAvailableCount,
  searchBook
} = require("../services/books");


router.post("/singup", upload.single("profilePicture"), (req, res) => {
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

router.get("/book/:bookId", (req, res) => {
  getSingleBook(req, res)
})


router.get("/user/avatar/:userId", (req, res) => {
  getUserAvatar(req, res)
})


router.post("/addcomment", passport.authenticate("jwtBanCheck", {
  session: false
}), (req, res) => {
  addComment(req, res)
})


router.post("/bookingBook", passport.authenticate("jwtBanCheck", {
  session: false
}), (req, res) => {
  bookingBook(req.body.bookId, req.user._id, req.body.bookingTime)
    .then(() => decrementAvailableCount(req.body.bookId))
    .then(() => {
      logger.info(`user ${req.user._id} booked book ${req.body.bookId}`)
      res.sendStatus(200)
    })
    .catch(() => {
      res.sendStatus(400)
    })
})


router.post("/cancelBook", passport.authenticate("jwtBanCheck", {
  session: false
}), (req, res) => {
  cancelBook(req.body.bookId, req.user._id, res)
    .then(() => incrementAvailableCount(req.body.bookId))
    .then(() => {
      logger.info(`user ${req.user._id} canceled booking of book ${req.body.bookId}`)
      res.sendStatus(200)
    })
    .catch((err) => {
      logger.err(err);
      res.sendStatus(500);
    })
})


router.post("/search", (req, res) => {
  searchBook(req, res)
})


module.exports = router
