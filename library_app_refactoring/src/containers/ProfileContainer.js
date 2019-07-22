import React from "react";
import {connect} from 'react-redux'
import Profile from '../components/Profile'
import {logOutUser} from '../actions'

class ProfileContainer extends React.PureComponent {

  LogOutHandler = e =>{
    this.props.dispatch(logOutUser())
  }

  render() {
    let {login, email, profilePicture} = this.props
    return (
      <Profile login={login} email={email} profilePicture={profilePicture} LogOutHandler={this.LogOutHandler}/>
    );
  }
}

const mapStateToProps = state =>{
  return {
    login: state.user.login,
    email: state.user.email,
    profilePicture: state.user.profilePicture
  }
}

export default connect(mapStateToProps)(ProfileContainer);
