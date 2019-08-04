const { User, Book } = require("./mongo");
const { cancelBook, bookingBook, decrementAvailableCount, incrementAvailableCount, removeUserFromBook } = require('./books');
const { maxOnHandTime, messages} = require('../config/constants');
const { io } = require('../server');

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
    .then(() => {
      return bookingBook(bookId, userId)
    })
    .catch((err)=>logger.err(err.message))
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
        book.save()
          .then(()=>res())
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
        user.save()
          .then(()=>res())
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
          commentText: messages.deletedByModer
        }
        if (index > (-1)) book.comments.splice(index, 1, newComment);
        book.save()
          .then(() => io.sockets.emit(`dataUpdate${bookId}`))
        res();
      })
      .catch((err) => rej(err))
  })
}


const bookAdd = (req, res) => {
  let newBook = new Book({
    title: req.body.title,
    year: req.body.year,
    bookAthour: req.body.bookAthour,
    bookDiscription: req.body.bookDiscription,
    bookPicture: req.file.buffer,
  })
  newBook.save()
    .then(() => res.sendStatus(200))
    .catch((err) => logger.err(err.message))
}


const fetchBooksForManage = (req, res) => {
  let exp
  switch (req.params.filter) {
    case 'booked':
      exp = { bookBookedBy: { $gt: [] } };
      break;
    case 'on hands':
      exp = { bookOnHandAt: { $gt: [] } };
      break;
    default:
      exp = {};
  }
  Book.find(exp)
    .then(books => books.map(book => {
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
    .then(books => res.json(books))
}


const fetchUsersForManage = (req, res) => {
  let searchExp = {}
  if (req.body.exp) {
    let regExp = new RegExp(req.body.exp, 'gi')
    searchExp = { $or: [{ login: regExp }, { email: regExp }] }
  }
  User.find(searchExp)
    .then(users => users.map(user => {
      return newUser = {
        _id: user._id,
        login: user.login,
        email: user.email,
        booksOnHand: user.booksOnHand,
        bookingBooks: user.bookingBooks,
        isBan: user.isBan
      }
    }))
    .then(users => res.json(users))
}


const banUser = (req, res) => {
  return User.findById(req.body.userId)
    .then(user => {
      user.isBan = req.body.ban
      user.ban = {
        reason: req.body.reason,
        date: Date.now(),
      }
      if (req.body.ban) {
        user.bookingBooks.forEach(book => {
          removeUserFromBook(book.bookId, req.body.userId)
            .then(() => incrementAvailableCount(book.bookId))
        })
        user.bookingBooks = new Array();
      }
      user.save()
    })
    .then(() => res.sendStatus(200))
    .catch(err => logger.err(err.message))
}


const fetchUserData = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      res.json({
        managedUser: {
          _id: user._id,
          login: user.login,
          email: user.email,
          booksOnHand: user.booksOnHand,
          bookingBooks: user.bookingBooks,
          isBan: user.isBan,
          ban: user.ban
        }
      })
    })
}


module.exports = {
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
}
