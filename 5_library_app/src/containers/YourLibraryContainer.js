import React from 'react';
import { connect } from 'react-redux';
import BookingBooks from '../components/BookingBooks/BookingBooks'
import BooksOnHand from '../components/BooksOnHand/BooksOnHand'
import { cancelBook } from "../actions"

class YourLibraryContainer extends React.PureComponent {

  cancelBook = bookId => {
    this.props.onCancelBook(bookId)
  }

  render() {
    return (
      <>
        <BookingBooks bookingBooks={this.props.bookingBooks} cancelBook={this.cancelBook}/>
        <BooksOnHand booksOnHand = {this.props.booksOnHand}/>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    bookingBooks: state.user.bookingBooks,
    booksOnHand: state.user.booksOnHand
  }
}

const mapDispatcheToProps = dispatch => {
  return {
    onCancelBook: (bookId) => dispatch(cancelBook(bookId))
  }
}

export default connect(mapStateToProps, mapDispatcheToProps)(YourLibraryContainer);
