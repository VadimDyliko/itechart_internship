import React from 'react';
import {Link} from "react-router-dom";
import './BookInline.css';

class BookInline extends React.PureComponent {

  render() {
    let {bookOnHandAt, bookBookedBy, _id, title, availableCount, bookAthour, year} = this.props.book
    return (
      <div className="book-inline">
        <div className="book-inline__cover">
          <img src={`/book/cover/${_id}`} className="book-inline__cover-image" alt="cover"/>
        </div>
        <div className="book-inline__about">
          <Link to={`/book/${_id}`} className="book-inline-link">
            <p>{title}</p>
          </Link>
          <p>{bookAthour}</p>
          <p>{year}</p>
          <p>Booked / On hands / Available: {bookBookedBy.length}/{bookOnHandAt.length}/{availableCount}</p>
          <Link to={`/book/${_id}/manage`} className="book-inline-link">
            <p>Manage this book</p>
          </Link>
        </div>
      </div>
  )
  }
}

export default BookInline;
