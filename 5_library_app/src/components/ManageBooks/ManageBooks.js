import React from 'react';
import './ManageBooks.css';

class ManageBooks extends React.PureComponent {

  selectHandler = e => {
    this.props.filterHandler(e.target.value)
  }

  render () {
    return(
      <div className="manage-books">
        <select className="manage-books__filter-select" onChange={this.selectHandler}>
          <option>all</option>
          <option>on hands</option>
          <option>booked</option>
        </select>
        {
          this.props.manageBooks.map(book=>{
            return <div key={book._id}>{book.title}</div>
          })
        }
      </div>
    )
  }
}

export default ManageBooks;
