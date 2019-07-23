import React from "react";
import {connect} from 'react-redux'
import Profile from '../components/Profile/Profile'
import {logOutUser} from '../actions'
import guestProfilePicture from '../png/person.png'

class ProfileContainer extends React.PureComponent {

  LogOutHandler = e =>{
    this.props.onLogOutUser()
    .then(()=>this.props.history.push('/home'))
  }

  render() {
    let {login, email, profilePicture = guestProfilePicture} = this.props
    return (
      <Profile login={login} email={email} profilePicture={profilePicture} LogOutHandler={this.LogOutHandler}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.user.login,
    email: state.user.email,
    profilePicture: state.user.profilePicture
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogOutUser: () => {return dispatch(logOutUser())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
