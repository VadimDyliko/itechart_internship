import React from "react";
import {connect} from 'react-redux'
import {fetchBooks, fetchBookCover} from "../actions"
import Home from "../components/Home/Home"
import Spiner from "../components/Spiner"

class HomeContainer extends React.PureComponent {
  state = {
    isLoading: true
  }

  componentDidMount() {
    this.props.onFetchBooks().then(() => this.setState({isLoading: false}))
  }

  bookClickHandler = bookId => {
    this.props.history.push(`/book/${bookId}/`)
  }

  bookCoverHandler = bookId => {
    return this.props.onFetchBookCover(bookId)
  }

  render() {
    let content = this.state.isLoading
      ? <Spiner/>
      : <Home books={this.props.books} bookClickHandler={this.bookClickHandler} bookCoverHandler={this.bookCoverHandler}/>
    return (<> {
      content
    } < />
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchBooks: (filter) => {return dispatch(fetchBooks())},
    onFetchBookCover: (bookId) => {return dispatch(fetchBookCover(bookId))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
