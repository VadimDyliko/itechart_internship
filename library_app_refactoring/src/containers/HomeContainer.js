import React from "react";
import {connect} from 'react-redux'
import {fetchBooks} from "../actions"
import Home from "../components/Home/Home"
import Spiner from "../components/Spiner"


class HomeContainer extends React.PureComponent {
  state={
    isLoading: true,
  }

  componentDidMount() {
    //filter do not realized yet
    this.props.onFetchBooks('all')
    .then(()=>this.setState({isLoading: false}))
  }

  bookClickHandler = bookId => {
    console.log(bookId);
    this.props.history.push(`/book/${bookId}/`)
  }

  render() {
    let content = this.state.isLoading?<Spiner/>:<Home books={this.props.books} bookClickHandler={this.bookClickHandler}/>
    return (
      <>
      {content}
      </>
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
    onFetchBooks: (filter) => {return dispatch(fetchBooks())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
