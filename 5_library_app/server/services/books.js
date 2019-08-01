const { User, Book } = require("./mongo");
const { io } = require('../server');
const { maxBookingTime } = require("../config/constants");

const getSingleBookCover = (req, res) => {
  Book.findById(req.params.bookId)
    .then(book => {
      res.set('Content-Type', 'image/jpeg');
      res.send(book.bookPicture)
    })
    .catch((err) => console.log(err))
}


const getBooks = (req, res) => {
  Book.find()
    .then(books => books.map(book => {
      return newBook = {
        _id: book._id,
        title: book.title,
        year: book.year,
        bookAthour: book.bookAthour
      }
    }))
    .then(books => {
      res.json(books)
    })
}


const getSingleBookData = (id) => {
  return Book.findById(id)
    .catch((err) => console.log(err))
}


const addComment = (req, res) => {
  if (!req.body.bookId) {
    res.sendStatus(400)
    return
  }
  let newComment = {
    commentAuthorId: req.user._id,
    commentAuthor: req.user.login,
    commentText: req.body.commentText,
    date: Date.now(),
  }
  Book.findByIdAndUpdate(req.body.bookId, {
      $push: {
        comments: newComment
      }
    }, {
      safe: true,
      upsert: true
    })
    .then(() => {
      io.sockets.emit(`dataUpdate${req.body.bookId}`);
      res.sendStatus(200)
    })
    .catch(err => console.log(err))
}


const getSingleBook = (req, res) => {
  Book.findById(req.params.bookId)
    .then(book => {
      return newBook = {
        [book._id]: {
          title: book.title,
          year: book.year,
          bookAthour: book.bookAthour,
          bookDiscription: book.bookDiscription
        }
      }
    })
    .then(book => res.json(book))
    .catch((err) => console.log(err))
}


const bookingBook = (bookId, userId, bookingTime) => {
  if (!bookingTime) bookingTime = maxBookingTime
  return Book.findById(bookId)
    .then((book) => {
      let index = -1;
      book.bookBookedBy.forEach((book, i) => {
        let stringUserId = userId.toString()
        let bookUserId = book.userId.toString()
        if (bookUserId === stringUserId) index = i
      })
      if (book.availableCount > 0 && index < 0) {
        Promise.all([setUserToBookBook(bookId, userId, bookingTime), setBookingBookToUser(book, userId, bookingTime)])
          .then(() => {
            io.sockets.emit(`dataUpdate${bookId}`)
          })
          .catch((err) => console.log(err))
      } else {
        throw new Error()
      }
    })
}


const setUserToBookBook = (bookId, userId, bookingTime) => {
  return new Promise((res, rej) => {
    let data = {
      userId: userId,
      dateOfBook: Date.now(),
      datebookEnd: Date.now() + bookingTime,
    }
    Book.findByIdAndUpdate(bookId, {
        $push: {
          bookBookedBy: data
        }
      }, {
        safe: true,
        upsert: true
      })
      .then(() => res())
      .catch(err => rej(err))
  })
}


const setBookingBookToUser = (book, userId, bookingTime) => {
  return new Promise((res, rej) => {
    let data = {
      bookId: book._id,
      title: book.title,
      dateOfBook: Date.now(),
      datebookEnd: Date.now() + bookingTime,
    }
    User.findByIdAndUpdate(userId, {
        $push: {
          bookingBooks: data
        }
      }, {
        safe: true,
        upsert: true
      })
      .then(() => res())
      .catch((err) => rej(err))
  })
}


const cancelBook = (bookId, userId) => {
  return Promise.all([removeUserFromBook(bookId, userId), removeBookFromUser(bookId, userId)])
    .then(data => data[0])
}


const removeUserFromBook = (bookId, userId) => {
  return new Promise((res, rej) => {
    userId = userId.toString()
    Book.findById(bookId)
      .then((book) => {
        book.bookBookedBy.forEach((booked, i, arr) => {
          let bookUserId = booked.userId.toString()
          if (bookUserId == userId) arr.splice(i, 1);
        })
        book.save();
        res(book);
      })
  })
}


const removeBookFromUser = (bookId, userId) => {
  return new Promise((res, rej) => {
    bookId = bookId.toString()
    User.findById(userId)
      .then((user) => {
        user.bookingBooks.forEach((book, i, arr) => {
          let userBookId = book.bookId.toString()
          if (bookId === userBookId) arr.splice(i, 1);
        })
        user.save();
        res();
      })
      .catch((err) => rej(err))
  })
}


const decrementAvailableCount = bookId => {
  return Book.findById(bookId)
    .then((book) => {
      book.availableCount--;
      book.save()
    })

}


const incrementAvailableCount = bookId => {
  return Book.findById(bookId)
    .then((book) => {
      book.availableCount++;
      book.save()
    })
}


const searchBook = (req, res) => {
  let regExp = new RegExp(req.body.searchExp, 'gi')
  Book.find({
      $or: [{
        title: regExp
      }, {
        bookAthour: regExp
      }, {
        year: regExp
      }]
    })
    .then(books => {
      books = books.map(book => {
        return {
          _id: book._id,
          title: book.title
        }
      })
      res.json(books)
    })
}


module.exports = {
  getBooks,
  getSingleBookCover,
  getSingleBookData,
  addComment,
  getSingleBook,
  bookingBook,
  cancelBook,
  decrementAvailableCount,
  incrementAvailableCount,
  searchBook,
  removeUserFromBook,
  removeBookFromUser
}
