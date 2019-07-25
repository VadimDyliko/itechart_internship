import React from "react";
import {connect} from 'react-redux'
import Profile from '../components/Profile/Profile'
import {logOutUser} from '../actions'

class ProfileContainer extends React.PureComponent {

  LogOutHandler = e => {
    this.props.onLogOutUser().then(() => this.props.history.push('/home'))
  }

  render() {
    let {
      login,
      email,
      userId
    } = this.props
    return (<Profile login={login} email={email} userId={userId} LogOutHandler={this.LogOutHandler}/>);
  }
}

const mapStateToProps = state => {
  return {login: state.user.login, email: state.user.email, userId: state.user._id}
}

const mapDispatchToProps = dispatch => {
  return {
    onLogOutUser: () => {
      return dispatch(logOutUser())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
