import React from "react";
import './Home.css';
import Book from '../Book/Book';

class Home extends React.PureComponent {

  render() {
    return (
      <div className="home">
        {this.props.books.map(book=>{
          return (
            <Book key={book._id} book={book} bookClickHandler={this.props.bookClickHandler}/>
          )
        })}
      </div>
    );
  }
}

export default Home;
