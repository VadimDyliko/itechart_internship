import React from 'react';
import BookingBooks from '../BookingBooks/BookingBooks'
import BooksOnHand from '../BooksOnHand/BooksOnHand'
import './YourLibrary.css'

class YourLibrary extends React.PureComponent {
  render () {
    return(
      <div className="your-library">
        <BookingBooks bookingBooks={this.props.bookingBooks} cancelBook={this.props.cancelBook}/>
        <BooksOnHand booksOnHand = {this.props.booksOnHand}/>
      </div>
    )
  }
}

export default YourLibrary;
