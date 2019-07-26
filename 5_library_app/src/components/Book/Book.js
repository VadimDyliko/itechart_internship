import React from 'react';
import './Book.css';

class Book extends React.PureComponent {

  state = {
    bookCover: ''
  }

  componentDidMount() {
    this.props.bookCoverHandler(this.props.book._id)
    .then((cover) => {this.setState({bookCover: cover})})
  }

  clickHandler = () => {
    this.props.bookClickHandler(this.props.book._id)
  }

  render() {
    let cover = this.state.bookCover
      ? <img src={this.state.bookCover} className="book__cover-image" alt="cover"/>
      : <p>Loading cover ...</p>
    return (<div className="book" onClick={this.clickHandler}>
      {cover}
    </div>)
  }
}

export default Book;
