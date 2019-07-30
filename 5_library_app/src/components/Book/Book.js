import React from 'react';
import './Book.css';

class Book extends React.PureComponent {

  clickHandler = () => {
    this.props.bookClickHandler(this.props.book._id)
  }

  render() {
    return (<div className="book" onClick={this.clickHandler}>
      <img src={`/book/cover/${this.props.book._id}`} className="book__cover-image" alt="cover"/>
      <div className="book__about">
        <span className="book__title">{this.props.book.title}</span>
      </div>
    </div>)
  }
}

export default Book;
