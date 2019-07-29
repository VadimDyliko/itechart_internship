const { User, Book } = require("./mongo");
const { io } = require('../server');
const { maxBookingTime } = require("../config/constants")

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
        tittle: book.tittle,
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
          tittle: book.tittle,
          year: book.year,
          bookAthour: book.bookAthour,
          bookDiscription: book.bookDiscription
        }
      }
    })
    .then(book => res.json(book))
    .catch((err) => console.log(err))
}

const bookingBook = (bookId, userId) => {
  return Book.findById(bookId)
    .then((book) => {
      let index = -1;
      book.bookBookedBy.forEach((book, i) => {
        let stringUserId = userId.toString()
        let bookUserId = book.userId.toString()
        if (bookUserId === stringUserId) index = i
      })
      if (book.availableCount > 0 && index<0) {
        Promise.all([setUserToBookBook(bookId, userId), setBookingBookToUser(book, userId)])
          .then(() => {
            io.sockets.emit(`dataUpdate${bookId}`)
          })
          .catch((err) => console.log(err))
      } else {
        throw new Error()
      }
    })
}


const setUserToBookBook = (bookId, userId) => {
  return new Promise((res, rej) => {
    let data = {
      userId: userId,
      dateOfBook: Date.now(),
      datebookEnd: Date.now() + maxBookingTime,
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


const setBookingBookToUser = (book, userId) => {
  return new Promise((res, rej) => {
    let data = {
      bookId: book._id,
      tittle: book.tittle,
      dateOfBook: Date.now(),
      datebookEnd: Date.now() + maxBookingTime,
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
}


const removeUserFromBook = (bookId, userId) => {
  return new Promise((res, rej) => {
    userId = userId.toString()
    Book.findById(bookId)
      .then((book) => {
        let index = -1;
        book.bookBookedBy.forEach((book, i) => {
          let bookUserId = book.userId.toString()
          if (bookUserId === userId) index = i
        })
        if (index > (-1)) {
          book.bookBookedBy.splice(index, 1);
          // book.availableCount++;
          book.save();
          res();
        } else {
          throw new Error('There are not such user')
        }
      })
      .catch((err) => rej(err))
  })
}


const removeBookFromUser = (bookId, userId) => {
  return new Promise((res, rej) => {
    bookId = bookId.toString()
    User.findById(userId)
      .then((user) => {
        let index = -1;
        user.bookingBooks.forEach((book, i) => {
          let userBookId = book.bookId.toString()
          if (bookId === userBookId) index = i
        })
        if (index > (-1)) user.bookingBooks.splice(index, 1);
        user.save();
        res();
      })
      .catch((err) => rej(err))
  })
}


const decrementAvailableCount = bookId => {
  return Book.findById(bookId)
    .then((book)=>{
      book.availableCount--;
      book.save()
    })

}


const incrementAvailableCount = bookId => {
  return Book.findById(bookId)
    .then((book)=>{
      book.availableCount++;
      book.save()
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
  incrementAvailableCount
}
