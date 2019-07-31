import React from 'react';
import {connect} from 'react-redux';
import ManageBooks from '../components/ManageBooks/ManageBooks'
import {suFetchBooksForManage, suSortManageBooksArr} from '../actions'

class ManageBooksContainer extends React.PureComponent {

  state={
    booksArr: this.props.manageBooks
  }

  componentDidMount() {
    this.props.onSuFetchBooksForManage('all')
  }

  componentDidUpdate(prevProps, prevState) {
    this.setState({booksArr:this.props.manageBooks})
  }

  filterHandler = (filter) => {
    this.props.onSuFetchBooksForManage(filter)
  }


  sortHandler = sortBy => {
    this.props.onSuSortManageBooksArr(this.state.booksArr, sortBy)
  }

  render () {
    return(
      <ManageBooks filterHandler={this.filterHandler} manageBooks={this.state.booksArr} sortHandler={this.sortHandler}/>
    )
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
