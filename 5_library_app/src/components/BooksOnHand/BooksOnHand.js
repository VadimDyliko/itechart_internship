import React from 'react';
import './BooksOnHand.css'
import BookOnHand from "../BookOnHand/BookOnHand"

class BookingBooks extends React.Component {
  render () {
    return(
      <div className="books-on-hand">
        <h4>Books on hand:</h4>
          {
            this.props.booksOnHand.map(book=>{
              return <BookOnHand key={book.bookId} book={book}/>
            })
          }
      </div>
    )
  }
}

export default BookingBooks;
