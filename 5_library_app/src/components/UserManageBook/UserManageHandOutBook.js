import React from 'react'
import { Link } from "react-router-dom";
import './UserManageBook.css'

class UserManageBookedBook extends React.PureComponent {

  cancelHandler = () => {
    this.props.suCancel(this.props.userId, this.props.book.bookId)
  }

  suReturnBookToLibrary = () => {
    this.props.suReturnBookToLibrary(this.props.userId, this.props.book.bookId)
  }


  render() {
    let { bookId, title, dateOfHandOut, dateToReturn } = this.props.book
    let timeOnHands = new Date(Date.now() - dateOfHandOut)
    dateOfHandOut = new Date(dateOfHandOut).toLocaleString();
    dateToReturn = new Date(dateToReturn).toLocaleString();
    return (
      <div className="user-manage-book">
          <div className="book-inline__cover">
            <img src={`/book/cover/${bookId}`} className="book-inline__cover-image" alt="cover"/>
          </div>
          <div className="user-manage-book__about">
            <Link to={`/book/${bookId}`} className="user-manage-book-link">
              <p>{title}</p>
            </Link>
            <p>Date of hand out: {dateOfHandOut}</p>
            <p>Date to return: {dateToReturn}</p>
            <p>Time on hands: {timeOnHands.getDate()-1} days, {timeOnHands.getHours()-3} hours, {timeOnHands.getMinutes()} minutes.</p>
            <Link to={`/book/${bookId}/manage`} className="user-manage-book-link">
              <p>Manage this book</p>
            </Link>
          </div>
          <button className="user-manage-book__btn" onClick={this.cancelHandler}>Return to book status</button>
          <button className="user-manage-book__btn" onClick={this.suReturnBookToLibrary}>Return to library</button>
      </div>
    )
  }
}

export default UserManageBookedBook;
