import React from 'react';
import "./BookManageItem.css";

class BookManageBookedItem extends React.Component {

  handOutHandler = () => {
    this.props.handOutHandler(this.props.book.userId)
  }

  cancelBookHandler = () => {
    this.props.cancelBookHandler(this.props.book.userId)
  }

  render () {
    return(
      <div className="book-manage__item">
        <p>user id: {this.props.book.userId}</p>
        <p>Booked date: {this.props.book.dateOfBook}</p>
        <p>Booking left date: {this.props.book.datebookEnd}</p>
        <button className="" onClick={this.handOutHandler}>Hand out</button>
        <button className="" onClick={this.cancelBookHandler}>Cancel book</button>
      </div>
    )
  }
}

export default BookManageBookedItem;
