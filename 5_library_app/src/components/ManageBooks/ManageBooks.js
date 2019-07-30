import React from 'react';
import './ManageBooks.css';
import BookInline from '../BookInline/BookInline'

class ManageBooks extends React.PureComponent {

  selectHandler = e => {
    this.props.filterHandler(e.target.value)
  }

  render () {
    return(
      <div className="manage-books">
        <select className="manage-books__filter-select" onChange={this.selectHandler}>
          <option>booked</option>
          <option>on hands</option>
          <option>all</option>
        </select>
        {
          this.props.manageBooks.map(book=>{
            return <BookInline key={book._id} book={book} />
          })
        }
      </div>
    )
  }
}

export default ManageBooks;
