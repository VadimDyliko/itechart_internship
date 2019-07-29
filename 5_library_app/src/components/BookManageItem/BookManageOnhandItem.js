import React from 'react';
import "./BookManageItem.css";

class BookManageBookedItem extends React.Component {

  returnTobookStatus = () => {
    this.props.returnTobookStatus(this.props.book.userId)
  }

  render () {
    return(
      <div className="book-manage__item">
        <p>user id: {this.props.book.userId}</p>
        <p>Hand out date: {this.props.book.dateOfHandOut}</p>
        <p>Hand out left date: {this.props.book.dateToReturn}</p>
        <button className="" onClick={this.returnTobookStatus}>Return to book status</button>
      </div>
    )
  }
}

export default BookManageBookedItem;
