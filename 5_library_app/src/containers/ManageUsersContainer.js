import React from 'react';
import {connect} from 'react-redux';
import ManageUsers from '../components/ManageUsers/ManageUsers'
import {suFetchUsersForManage} from '../actions'

class ManageUsersContainer extends React.PureComponent {

  state={
    usersArr: this.props.manageUsers
  }

  componentDidMount() {
    this.props.onSuFetchUsersForManage()
  }

  componentDidUpdate(prevProps, prevState) {
    this.setState({usersArr:this.props.manageUsers})
  }

  searchHandler = (searchExp) => {
    this.props.onSuFetchUsersForManage(searchExp)
  }


  render () {
    return(
      <ManageUsers manageUsers={this.state.usersArr} sortHandler={this.sortHandler} searchHandler={this.searchHandler}/>
    )
  }
}

const mapStateToProps = state => {
  return {
    manageUsers: state.manageUsers,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSuFetchUsersForManage: (filter) => dispatch(suFetchUsersForManage(filter)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersContainer);
