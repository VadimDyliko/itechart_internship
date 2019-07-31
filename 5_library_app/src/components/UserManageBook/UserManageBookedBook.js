import React from 'react'
import {Link} from "react-router-dom";
import './UserManageBook.css'

class UserManageBookedBook extends React.PureComponent {

  cancelHandler = () => {
    this.props.suCancel(this.props.userId, this.props.book.bookId)
  }

  suHandOutBook = () => {
    this.props.suHandOutBook(this.props.userId, this.props.book.bookId)
  }

  render () {
    let {bookId, title} = this.props.book
    return(
      <div className="user-manage-book">
          <div className="book-inline__cover">
            <img src={`/book/cover/${bookId}`} className="book-inline__cover-image" alt="cover"/>
          </div>
          <div className="user-manage-book__about">
            <Link to={`/book/${bookId}`} className="user-manage-book-link">
              <p>{title}</p>
            </Link>
            <Link to={`/book/${bookId}/manage`} className="user-manage-book-link">
              <p>Manage this book</p>
            </Link>
          </div>
          <button className="user-manage-book__btn" onClick={this.cancelHandler}>Cancel book</button>
          <button className="user-manage-book__btn" onClick={this.suHandOutBook}>Hand out book</button>
      </div>
    )
  }
}

export default UserManageBookedBook;
