import React from 'react';
import { Link } from "react-router-dom";
import "./BookedBook.css";

class BookedBook extends React.PureComponent {

  cancelBook = () => {
    this.props.cancelBook(this.props.book.bookId);
  }

  render() {
    let { bookId, title, dateOfBook, datebookEnd } = this.props.book;
    dateOfBook = new Date(dateOfBook).toLocaleString();
    datebookEnd = new Date(datebookEnd).toLocaleString();
    return (
      <div className="booked-book">
        <img className="booked-book__cover-image" src={`/book/cover/${bookId}`} alt="cover"/>
        <div className="booked-book__details">
          <Link to={`/book/${bookId}/`} className="navigation-link">
              {title}
          </Link>
          <p>Date of book: {dateOfBook}</p>
          <p>Date of book end: {datebookEnd}</p>
          <button className="btn" onClick={this.cancelBook}>Cancel book</button>
        </div>
      </div>
    )
  }
}

export default BookedBook;
