import React from 'react';
import { connect } from 'react-redux';
import ManageBooks from '../components/ManageBooks/ManageBooks'
import { suFetchBooksForManage, suSortManageBooksArr } from '../actions/su'
import Spiner from '../components/Spiner/Spiner'

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
    this.setState({ showSpiner: true })
    this.props.onSuFetchBooksForManage(filter).then(() => this.setState({ showSpiner: false }))
  }

  sortHandler = sortBy => {
    this.setState({ showSpiner: true })
    this.props.onSuSortManageBooksArr(this.state.booksArr, sortBy).then(() => this.setState({ showSpiner: false }))
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
