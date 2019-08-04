import React, { Suspense } from "react";
import { connect } from 'react-redux';
import { fetchBooks } from "../actions";
import Spiner from "../components/Spiner/Spiner";
const Home = React.lazy(() => import('../components/Home/Home'));

class HomeContainer extends React.PureComponent {

  componentDidMount() {
    this.props.onFetchBooks()
  }

  bookClickHandler = bookId => {
    this.props.history.push(`/book/${bookId}/`)
  }

  render() {
    return (<Suspense fallback={<Spiner / >}>
      <Home books={this.props.books} bookClickHandler={this.bookClickHandler}/>
    </Suspense >);
  }
}

const mapStateToProps = state => {
  return { books: state.books }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchBooks: (filter) => {
      return dispatch(fetchBooks())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
