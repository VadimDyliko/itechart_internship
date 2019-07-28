import React from 'react';
import {connect} from 'react-redux';
import BookingBooks from '../components/BookingBooks/BookingBooks'

class YourLibraryContainer extends React.PureComponent {
  render () {
    return(
      <>
        <BookingBooks bookingBooks={this.props.bookingBooks}/>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    bookingBooks: state.user.bookingBooks,
  }
}

export default connect(mapStateToProps)(YourLibraryContainer);
