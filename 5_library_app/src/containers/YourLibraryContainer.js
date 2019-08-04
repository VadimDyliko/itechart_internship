import React from 'react';
import { connect } from 'react-redux';
import YourLibrary from '../components/YourLibrary/YourLibrary'
import { cancelBook } from "../actions"


class YourLibraryContainer extends React.PureComponent {

  cancelBook = bookId => {
    this.props.onCancelBook(bookId)
  }

  render() {
    return <YourLibrary bookingBooks={this.props.bookingBooks} cancelBook={this.cancelBook} booksOnHand = {this.props.booksOnHand}/>
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
