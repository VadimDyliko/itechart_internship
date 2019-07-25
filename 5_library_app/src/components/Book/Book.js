import React from 'react';
import './Book.css';

class Book extends React.PureComponent {

  state = {
    coverImgUrl: `/book/cover/${this.props.book._id}`
  }

  clickHandler = () => {
    this.props.bookClickHandler(this.props.book._id)
  }

  render() {
    return (<div className="book" onClick={this.clickHandler}>
      <img src={this.state.coverImgUrl} className="book__cover-image" alt="cover"/>
    </div>)
  }
}

export default Book;
