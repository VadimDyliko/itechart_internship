const {
  User,
  Book
} = require("./mongo");
const {
  cancelBook,
  bookingBook,
  decrementAvailableCount,
  incrementAvailableCount
} = require('./books');
const {
  maxOnHandTime
} = require('../config/constants');
const {
  io
} = require('../server');

const suFetchBookData = (req, res) => {
  Book.findById(req.params.bookId)
    .then(book => {
      res.json({
        managedBook: {
          bookBookedBy: book.bookBookedBy,
          bookOnHandAt: book.bookOnHandAt
        }
      })
    })
}


const suHandOutBook = (userId, bookId) => {
  return cancelBook(bookId, userId)
    .then((book) => Promise.all([setUserToBookOnHands(bookId, userId), setBookIsOnHandToUser(bookId, userId, book)]))
}


const setUserToBookOnHands = (bookId, userId) => {
  return new Promise((res, rej) => {
    let data = {
      userId: userId,
      dateOfHandOut: Date.now(),
      dateToReturn: Date.now() + maxOnHandTime,
    }
    Book.findByIdAndUpdate(bookId, {
        $push: {
          bookOnHandAt: data
        }
      }, {
        safe: true,
        upsert: true
      })
      .then(() => res())
      .catch(err => rej(err))
  })
}


const setBookIsOnHandToUser = (bookId, userId, book) => {
  return new Promise((res, rej) => {
    let data = {
      title: book.title,
      bookId: bookId,
      dateOfHandOut: Date.now(),
      dateToReturn: Date.now() + maxOnHandTime,
    }
    User.findByIdAndUpdate(userId, {
        $push: {
          booksOnHand: data
        }
      }, {
        safe: true,
        upsert: true
      })
      .then(() => res())
      .catch((err) => rej(err))
  })
}


const suCancelBook = (userId, bookId) => {
  return cancelBook(bookId, userId)
}


const suReturnToBookStatus = (userId, bookId) => {
  return suReturnBookFromHands(userId, bookId)
    .then(() => bookingBook(bookId, userId))
}


const suReturnBookFromHands = (userId, bookId) => {
  return Promise.all([removeUserFromBookOnHands(userId, bookId), removeBookFromUserOnHands(userId, bookId)])
}


const removeUserFromBookOnHands = (userId, bookId) => {
  return new Promise((res, rej) => {
    Book.findById(bookId)
      .then((book) => {
        let index = -1;
        book.bookOnHandAt.forEach((book, i) => {
          if (book.userId === userId) index = i
        })
        if (index > (-1)) book.bookOnHandAt.splice(index, 1);
        book.save();
        res();
      })
      .catch((err) => rej(err))
  })
}




const removeBookFromUserOnHands = (userId, bookId) => {
  return new Promise((res, rej) => {
    User.findById(userId)
      .then((user) => {
        let index = -1;
        user.booksOnHand.forEach((book, i) => {
          if (bookId === book.bookId) index = i
        })
        if (index > (-1)) user.booksOnHand.splice(index, 1);
        user.save();
        res();
      })
      .catch((err) => rej(err))
  })
}


const deleteComment = (bookId, commentId) => {
  return new Promise((res, rej) => {
    Book.findById(bookId)
      .then(book => {
        let index = -1
        book.comments.forEach((comment, i) => {
          if (commentId === (comment.commentAuthorId + comment.date)) index = i
        })
        let newComment = {
          ...book.comments[index],
          commentText: "<<<Deleted by moderator>>>"
        }
        if (index > (-1)) book.comments.splice(index, 1, newComment);
        book.save()
          .then(() => io.sockets.emit(`dataUpdate${bookId}`))
        res();
      })
      .catch((err) => rej(err))
  })
}


module.exports = {
  suFetchBookData,
  suHandOutBook,
  suCancelBook,
  suReturnBookFromHands,
  suReturnToBookStatus,
  deleteComment
}
