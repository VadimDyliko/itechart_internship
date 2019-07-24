const { User, Book } = require("./mongo");


const getBookCover = (req, res) => {
  Book.findById(req.params.bookId)
  .then(book => {return {
      _id: book._id,
      bookPicture: book.bookPicture
    }})
  .then(book=>res.json(book))
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
      console.log(books);
       res.json(books)
     })
}


module.exports = {
  getBookCover,
  getBooks
}
