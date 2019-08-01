const logger = require('../services/winston');
const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});
const {
  suFetchBookData,
  suHandOutBook,
  suCancelBook,
  suReturnBookFromHands,
  suReturnToBookStatus,
  deleteComment,
  bookAdd,
  fetchBooksForManage,
  fetchUsersForManage,
  banUser,
  fetchUserData
} = require("../services/su");
const {
  decrementAvailableCount,
  incrementAvailableCount,
  getBooks
} = require("../services/books")


router.get("/fetchBookData/:bookId", passport.authenticate("jwtSU", {
  session: false
}), (req, res) => {
  suFetchBookData(req, res)
})


router.post("/handout", passport.authenticate("jwtSU", {
  session: false
}), (req, res) => {
  suHandOutBook(req.body.userId, req.body.bookId, res)
    .then(() => res.sendStatus(200))
    .then(() => logger.info(`moderator hand out book ${req.body.bookId} to user ${req.body.userId}`))
    .catch((err) => logger.err(err))
})


router.post("/cancelBook", passport.authenticate("jwtSU", {
  session: false
}), (req, res) => {
  suCancelBook(req.body.userId, req.body.bookId, res)
    .then(() => incrementAvailableCount(req.body.bookId))
    .then(() => res.sendStatus(200))
    .then(() => logger.info(`moderator cancel book of book ${req.body.bookId} user ${req.body.userId}`))
    .catch((err) => logger.err(err))
})


router.post("/returntobookstatus", passport.authenticate("jwtSU", {
  session: false
}), (req, res) => {
  suReturnToBookStatus(req.body.userId, req.body.bookId, res)
    .then(() => res.sendStatus(200))
    .then(() => logger.info(`moderator return book status of book ${req.body.bookId} to user ${req.body.userId}`))
    .catch((err) => logger.err(err))
})


router.post("/deletecomment", passport.authenticate("jwtSU", {
  session: false
}), (req, res) => {
  deleteComment(req.body.bookId, req.body.commentId)
    .then(() => res.sendStatus(200))
    .then(() => logger.info(`moderator delete comment from book ${req.body.bookId} comment ${req.body.commentId}`))
    .catch((err) => logger.err(err))
})

router.post('/bookadd', passport.authenticate("jwtSU", {
  session: false
}), upload.single("coverImage"), (req, res) => {
  bookAdd(req, res)
})


router.get('/fetchbooksformanage/:filter', passport.authenticate("jwtSU", {
  session: false
}), (req, res) => {
  fetchBooksForManage(req, res)
})


router.post('/fetchusersformanage', passport.authenticate("jwtSU", {
  session: false
}), (req, res) => {
  fetchUsersForManage(req, res)
})


router.post('/banuser', passport.authenticate("jwtSU", {
  session: false
}), (req, res) => {
  banUser(req, res)
    .then(() => logger.warn(`moderator set ban status to ${req.body.ban} of user: ${req.body.userId} reason: ${req.body.reason}`))
    .catch((err) => logger.err(err))
})


router.get("/fetchUserData/:userId", passport.authenticate("jwtSU", {
  session: false
}), (req, res) => {
  fetchUserData(req, res)
})

module.exports = router
