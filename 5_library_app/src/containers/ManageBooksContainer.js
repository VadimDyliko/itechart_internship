import React from 'react';
import {connect} from 'react-redux';
import ManageBooks from '../components/ManageBooks/ManageBooks'
import {suFetchBooksForManage} from '../actions'

class SearchContainer extends React.PureComponent {

  componentDidMount() {
    this.props.onSuFetchBooksForManage('booked')
  }

  filterHandler = (filter) => {
    this.props.onSuFetchBooksForManage(filter)
  }


  render () {
    return(
      <ManageBooks filterHandler={this.filterHandler} manageBooks={this.props.manageBooks}/>
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
    onSuFetchBooksForManage: (filter) => dispatch(suFetchBooksForManage(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
