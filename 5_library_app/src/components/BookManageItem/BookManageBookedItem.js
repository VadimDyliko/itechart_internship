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
    let dateOfBook = new Date(this.props.book.dateOfBook).toLocaleString()
    let datebookEnd = new Date(this.props.book.datebookEnd).toLocaleString()
    return(
      <div className="book-manage__item">
        <img src={`/user/avatar/${this.props.book.userId}`} className="user-inline__avatar" alt="avatar"/>
        <p>user id: {this.props.book.userId}</p>
        <p>Booked date: {dateOfBook}</p>
        <p>Booking left date: {datebookEnd}</p>
        <button className="book-manage__btn" onClick={this.handOutHandler}>Hand out</button>
        <button className="book-manage__btn" onClick={this.cancelBookHandler}>Cancel book</button>
      </div>
    )
  }
}

export default BookManageBookedItem;
