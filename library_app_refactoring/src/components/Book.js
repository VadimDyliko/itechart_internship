import React from 'react';
import './Book.css';

class Book extends React.PureComponent {

  clickHandler = () => {
    this.props.bookClickHandler(this.props.book._id)
  }

  render () {
    let {_id, tittle, year, bookAthour, bookDiscription, bookPicture, comments} =this.props.book
    return(
      <div className="book" onClick={this.clickHandler}>
        <img src={bookPicture} className="book__cover-image" alt="cover"/>
      </div>
    )
  }
}

export default Book;
