import React from 'react';
import { connect } from 'react-redux';
import ManageBooks from '../components/ManageBooks/ManageBooks';
import { suFetchBooksForManage, suSortManageBooksArr } from '../actions/su';
import Spiner from '../components/Spiner/Spiner';

class ManageBooksContainer extends React.PureComponent {

  state = {
    booksArr: this.props.manageBooks,
    showSpiner: true
  }

  componentDidMount() {
    this.props.onSuFetchBooksForManage('all').then(() => this.setState({ showSpiner: false }))
  }

  componentDidUpdate(prevProps, prevState) {
    this.setState({ booksArr: this.props.manageBooks })
  }

  filterHandler = (filter) => {
    this.props.onSuFetchBooksForManage(filter)
  }

  sortHandler = sortBy => {
    this.props.onSuSortManageBooksArr(this.state.booksArr, sortBy)
  }

  render() {
    let content = this.state.showSpiner ?
    <Spiner/> :
      <ManageBooks filterHandler={this.filterHandler} manageBooks={this.state.booksArr} sortHandler={this.sortHandler}/>
      return ( < >
        { content }
        < />)
  }
}

const mapStateToProps = state => {
  return {
    manageBooks: state.manageBooks,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSuFetchBooksForManage: (filter) => dispatch(suFetchBooksForManage(filter)),
    onSuSortManageBooksArr: (booksArr, sortBy) => dispatch(suSortManageBooksArr(booksArr, sortBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooksContainer);
