import React from 'react';
import "./BookManageItem.css";

class BookManageBookedItem extends React.Component {

  returnTobookStatus = () => {
    this.props.returnTobookStatus(this.props.book.userId)
  }

  render () {
    let handOutDate = new Date(this.props.book.dateOfHandOut).toLocaleString()
    let handOutDateLeft = new Date(this.props.book.dateToReturn).toLocaleString()
    return(
      <div className="book-manage__item">
        <p>user id: {this.props.book.userId}</p>
        <p>Hand out date: {handOutDate}</p>
        <p>Hand out left date: {handOutDateLeft}</p>
        <button className="" onClick={this.returnTobookStatus}>Return to book status</button>
      </div>
    )
  }
}

export default BookManageBookedItem;
