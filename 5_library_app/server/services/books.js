const { User, Book } = require("./mongo");
const {io} = require('../server');
const {maxBookingTime} = require("../config/constants")

const getSingleBookCover = (req, res) => {
  Book.findById(req.params.bookId)
  .then(book=>{
    res.set('Content-Type', 'image/jpeg');
    res.send(book.bookPicture)
  })
  .catch((err)=>console.log(err))
}


const getBooks = (req, res) => {
  Book.find()
    .then(books =>books.map(book=>{
      return newBook = {
        _id: book._id,
        tittle: book.tittle,
        year: book.year,
        bookAthour: book.bookAthour
      }
    }))
    .then(books =>{
       res.json(books)
     })
}


const getSingleBookData = (id) => {
  return Book.findById(id)
  .catch((err)=>console.log(err))
}


const addComment = (req, res) => {
  if (!req.body.bookId){
    res.sendStatus(400)
    return
  }
  let newComment = {
    commentAuthorId: req.user._id,
    commentAuthor: req.user.login,
    commentText: req.body.commentText,
    date: Date.now(),
  }
  Book.findByIdAndUpdate(req.body.bookId,
    {$push: {comments: newComment}},
    {safe: true, upsert: true})
    .then(()=>{
      io.sockets.emit(`commentAddedTo${req.body.bookId}`);
      res.sendStatus(200)
    })
    .catch(err=>console.log(err))
}


const getSingleBook = (req, res) => {
  Book.findById(req.params.bookId)
  .then(book =>{
    return newBook = {
      [book._id]:{
        tittle: book.tittle,
        year: book.year,
        bookAthour: book.bookAthour,
        bookDiscription: book.bookDiscription
      }
    }
  })
  .then(book=>res.json(book))
  .catch((err)=>console.log(err))
}

const bookingBook = (bookId, userId, response) => {
  Promise.all([setUserToBookBook(bookId, userId),setBookingBookToUser(bookId, userId)])
  .then(()=>response.sendStatus(200))
  .catch((err)=>console.log(err))
}

const setUserToBookBook = (bookId, userId) =>{
  return new Promise ((res, rej)=>{
    let data = {
      userId: userId,
      dateOfBook: Date.now(),
      datebookEnd: Date.now() + maxBookingTime,
    }
    Book.findByIdAndUpdate(bookId,
      {$push: {bookBookedBy: data}},
      {safe: true, upsert: true})
        .then(book=>{
          book.availableCount--
          book.save()
        })
        .then(()=>res())
        .catch(err=>rej(err))
  })
}


const setBookingBookToUser = (bookId, userId) => {
  return new Promise ((res, rej)=>{
    let data = {
      bookId: bookId,
      dateOfBook: Date.now(),
      datebookEnd: Date.now() + maxBookingTime,
    }
    User.findByIdAndUpdate(userId,
      {$push: {bookingBooks: data}},
      {safe: true, upsert: true})
      .then(()=>res())
      .catch((err)=>rej(err))
  })
}


module.exports = {
  getBooks,
  getSingleBookCover,
  getSingleBookData,
  addComment,
  getSingleBook,
  bookingBook
}
