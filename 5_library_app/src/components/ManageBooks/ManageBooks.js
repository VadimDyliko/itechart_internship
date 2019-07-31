import React from 'react';
import './ManageBooks.css';
import BookInline from '../BookInline/BookInline'

class ManageBooks extends React.PureComponent {

  selectHandler = e => {
    this.props.filterHandler(e.target.value)
  }

  sortHandler = e => {
    this.props.sortHandler(e.target.value)
  }

  render() {
    return (<div className="manage-books">
      <div className="manage-books__controls">
        <span>Filter:</span>
        <select className="manage-books__select" onChange={this.selectHandler}>
          <option>all</option>
          <option>on hands</option>
          <option>booked</option>
        </select>
        <span>Sort by:</span>
        <select className="manage-books__select" onChange={this.sortHandler}>
          <option>id</option>
          <option>title</option>
          <option>on hands time</option>
          <option>author</option>
          <option>year</option>
        </select>
      </div>
      {
        this.props.manageBooks.map(book => {
          return <BookInline key={book._id} book={book}/>
        })
      }
    </div>)
  }
}

export default ManageBooks;
