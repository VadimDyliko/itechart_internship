import React from 'react';
import './BookingBooks.css'
import BookedBook from "../BookedBook/BookedBook"

class BookingBooks extends React.Component {
  render () {
    let books = this.props.bookingBooks.length?(
      this.props.bookingBooks.map(book=>{
        book.key = book.bookId+book.dateOfBook
        return <BookedBook key={book.key} book={book} cancelBook={this.props.cancelBook}/>
      })
    ):<p>none</p>
    return(
      <div className="booking-books">
        <h4>Booked books:</h4>
        {books}
      </div>
    )
  }
}

export default BookingBooks;
