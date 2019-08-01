import React from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search/Search'
import { searchRequest } from '../actions'

class SearchContainer extends React.PureComponent {

  searchHandler = searchExp => {
    this.props.onSearchRequest(searchExp);
  }

  bookClickHandler = bookId => {
    this.props.history.push(`/book/${bookId}/`)
  }

  render() {
    return (<Search searchHandler={this.searchHandler} searchResult={this.props.searchResult} bookClickHandler={this.bookClickHandler}/>)
  }
}

const mapStateToProps = state => {
  return { searchResult: state.searchResult }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchRequest: (searchExp) => dispatch(searchRequest(searchExp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
