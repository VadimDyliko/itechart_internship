import React from "react";
import {connect} from 'react-redux'
import './NavBar.css'
import {setUser} from "../../store/actions"
import SingIn from "./SingIn/SingIn"
import SingUp from "./SingUp/SingUp"
import LogInBtn from './LogInBtn'
import SingUpBtn from './SingUpBtn'
import LogOutBtn from './LogOutBtn'
import ProfileBtn from './ProfileBtn/ProfileBtn'
import Profile from './Profile/Profile'

class NavBar extends React.PureComponent {
  state = {
    isSingInMenuOpen: false,
    isSingUpMenuOpen: false,
    isProfileOpen: false
  }

  clickHandlerSingIn = (e) => {
    this.setState({
      isSingInMenuOpen: !this.state.isSingInMenuOpen
    })
  }

  clickHandlerSingUp = (e) => {
    this.setState({
      isSingUpMenuOpen: !this.state.isSingUpMenuOpen
    })
  }

  clickHandlerProfile = (e) => {
    this.setState({
      isProfileOpen: !this.state.isProfileOpen
    })
  }

  clickHandlerLogOut = (e) => {
    fetch('/logout')
    .then(res=>{
      if (res.status === 200){
        this.props.dispatch(setUser())
      }
    })
  }

  render() {

    let buttons = (this.props.user.login === 'guest')
      ? (<>
        < LogInBtn clickHandler = {this.clickHandlerSingIn} />
        < SingUpBtn clickHandler={this.clickHandlerSingUp} />
    </>)
      : (<>
        < LogOutBtn clickHandler={this.clickHandlerLogOut} />
        <ProfileBtn clickHandler={this.clickHandlerProfile}/>
      </>)

    return <> < nav className = "nav-bar" > {
      buttons
    } < Profile clickHandler = {
      this.clickHandlerProfile
    }
    isProfileOpen = {
      this.state.isProfileOpen
    } /> <SingIn clickHandler={this.clickHandlerSingIn} isSingInMenuOpen={this.state.isSingInMenuOpen}/>
    <SingUp clickHandler={this.clickHandlerSingUp} isSingUpMenuOpen={this.state.isSingUpMenuOpen}/>
  </nav>
</>;
  }
}

const putStatetoProps = (state) => {
  return ({user: state.user})
}

export default connect(putStatetoProps)(NavBar);
