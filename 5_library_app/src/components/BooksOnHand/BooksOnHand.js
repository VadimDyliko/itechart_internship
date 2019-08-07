import React from 'react';
import './BooksOnHand.css'
import BookOnHand from "../BookOnHand/BookOnHand"

class BookingBooks extends React.PureComponent {
  render() {
    let books = this.props.booksOnHand.length ? (
      this.props.booksOnHand.map(book => {
        return <BookOnHand key={book.bookId} book={book}/>
      })
    ) : <p>none</p>
    return (
      <div className="books-on-hand">
        <h4>Books on hand:</h4>
          {books}
      </div>
    )
  }
}

export default BookingBooks;
