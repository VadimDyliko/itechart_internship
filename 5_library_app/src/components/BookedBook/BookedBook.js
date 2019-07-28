import React from 'react'
import "./BookedBook.css"
import NavigationLink from "../NavigationLink/NavigationLink"

class BookedBook extends React.Component {
  render () {
    return(
      <div className="booked-book">
        <NavigationLink toPath={`/book/${this.props.book.bookId}/`} linkText={this.props.book.tittle} icon={`/book/cover/${this.props.book.bookId}`}/>
        <button className="btn">Cansel book</button>
      </div>
    )
  }
}

export default BookedBook;
