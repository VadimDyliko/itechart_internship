import React from 'react';
import { connect } from 'react-redux';
import ManageUsers from '../components/ManageUsers/ManageUsers'
import { suFetchUsersForManage } from '../actions/su'
import Spiner from '../components/Spiner/Spiner'

class ManageUsersContainer extends React.PureComponent {

  state = {
    usersArr: this.props.manageUsers,
    showSpiner: true
  }

  componentDidMount() {
    this.props.onSuFetchUsersForManage().then(() => this.setState({ showSpiner: false }))
  }

  componentDidUpdate(prevProps, prevState) {
    this.setState({ usersArr: this.props.manageUsers })
  }

  searchHandler = (searchExp) => {
    this.setState({ showSpiner: true })
    this.props.onSuFetchUsersForManage(searchExp).then(() => this.setState({ showSpiner: false }))
  }

  render() {
    let content = this.state.showSpiner ?
      <Spiner/> :
      <ManageUsers manageUsers={this.state.usersArr} sortHandler={this.sortHandler} searchHandler={this.searchHandler}/>
    return (
      < >
        {content}
      < />
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
