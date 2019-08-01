import React from 'react';
import { Link } from "react-router-dom";
import "./BookOnHand.css";

class BookOnHand extends React.Component {

  render() {
    let { bookId, title, dateOfHandOut, dateToReturn } = this.props.book;
    let timeOnHands = (Date.now() - dateOfHandOut) / 1000 / 60;
    dateOfHandOut = new Date(dateOfHandOut).toLocaleString();
    dateToReturn = new Date(dateToReturn).toLocaleString();
    return (
      <div className="book-on-hand">
        <img className="book-on-hand__cover-image" src={`/book/cover/${bookId}`} alt="cover"/>
        <div className="book-on-hand__details">
          <Link to={`/book/${bookId}/`} className="navigation-link">
              {title}
          </Link>
          <p>Date of hand out: {dateOfHandOut}</p>
          <p>Date to return: {dateToReturn}</p>
          <p>{timeOnHands}</p>
        </div>
      </div>
    )
  }
}

export default BookOnHand;
