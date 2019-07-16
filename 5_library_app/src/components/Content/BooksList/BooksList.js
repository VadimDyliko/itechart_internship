import React from 'react'
import Book from './Book/Book'

class BooksList extends React.PureComponent {
  render () {
    return(
      <div className="books-list">
      {
        this.props.booksArr.map((book, i) => {
          return (<Book key={book._id} tittle={book.tittle} bookAthour={book.bookAthour} _id={book._id} bookPicture={book.bookPicture} bookDetailHandler={this.props.bookDetailHandler} />);
        })
      }
      </div>
    )
  }
}

export default BooksList;
