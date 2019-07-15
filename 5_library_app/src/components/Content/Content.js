import React from "react";
import "./Content.css";
import Book from "./Book/Book";

class Content extends React.PureComponent {
  state = {
    booksArr: []
  };

  componentDidMount() {
    fetch("/books")
      .then(res => res.json())
      .then(data =>
        this.setState({
          booksArr: data
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="content">
        <div className="content__books">
          {" "}
          {this.state.booksArr.map(book => {
            return (
              <Book
                key={book._id}
                tittle={book.tittle}
                bookAthour={book.bookAthour}
                _id={book._id}
              />
            );
          })}{" "}
        </div>{" "}
      </div>
    );
  }
}

export default Content;
