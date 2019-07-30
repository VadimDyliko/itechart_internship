import React from 'react';
import './Search.css';
import Book from '../Book/Book'

class Search extends React.PureComponent {

  state={
    input: ''
  }

  inputHandler = (e) => {
    this.setState({input: e.target.value});
  }

  searchHandler = (e) => {
    e.preventDefault();
    this.props.searchHandler(this.state.input);
  }

  render () {
    return(
      <div className="search">
        <form onSubmit={this.searchHandler} className="search__form">
          <input type="text" className="search__input form-control" onChange={this.inputHandler}/>
          <button type="submit" className="btn">Search</button>
        </form>
        <div className="search-results">
        {
          this.props.searchResult.map((book, i)=>{
            return <Book key={book._id} book={book} bookClickHandler={this.props.bookClickHandler}/>
          })
        }
        </div>
      </div>
    )
  }
}

export default Search;
