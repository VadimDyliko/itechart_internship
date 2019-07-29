import React from 'react';
import './BookingBooks.css'
import BookedBook from "../BookedBook/BookedBook"

class BookingBooks extends React.Component {
  render () {
    return(
      <div className="booking-books">
        {
          this.props.bookingBooks.map(book=>{
            book.key = book.bookId+book.dateOfBook
            return <BookedBook key={book.key} book={book} cancelBook={this.props.cancelBook}/>
          })
        }
      </div>
    )
  }
}

export default BookingBooks;
