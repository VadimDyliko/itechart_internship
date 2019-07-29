import React from 'react';
import {connect} from 'react-redux';
import BookingBooks from '../components/BookingBooks/BookingBooks'
import {cancelBook} from "../actions"

class YourLibraryContainer extends React.PureComponent {

  cancelBook = bookId => {
    console.log(bookId);
    this.props.onCancelBook(bookId)
  }

  render () {
    return(
      <>
        <BookingBooks bookingBooks={this.props.bookingBooks} cancelBook={this.cancelBook}/>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    bookingBooks: state.user.bookingBooks,
  }
}

const mapDispatcheToProps = dispatch => {
  return {
    onCancelBook: (bookId)=>dispatch(cancelBook(bookId))
  }
}

export default connect(mapStateToProps, mapDispatcheToProps)(YourLibraryContainer);
