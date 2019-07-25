const { User, Book } = require("./mongo");

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
  .then(book =>{
    return newBook = {
      _id: book._id,
      tittle: book.tittle,
      year: book.year,
      bookAthour: book.bookAthour,
      bookDiscription: book.bookDiscription,
      comments: book.comments
    }
  })
  .catch((err)=>console.log(err))
}


module.exports = {
  getBooks,
  getSingleBookCover,
  getSingleBookData
}
