import React from "react";
import './NavBar.css'
import SingIn from "./SingIn/SingIn"
import SingUp from "./SingUp/SingUp"
import LogInBtn from './LogInBtn'
import SingUpBtn from './SingUpBtn'
import ProfileBtn from './ProfileBtn/ProfileBtn'
import Profile from './Profile/Profile'

class NavBar extends React.PureComponent {
  state={
    isSingInMenuOpen: false,
    isSingUpMenuOpen: false,
    isProfileOpen: false,
  }

  clickHandlerSingIn=(e)=>{
    this.setState({isSingInMenuOpen: !this.state.isSingInMenuOpen})
  }

  clickHandlerSingUp=(e)=>{
    this.setState({isSingUpMenuOpen: !this.state.isSingUpMenuOpen})
  }

  clickHandlerProfile=(e)=>{
    this.setState({isProfileOpen: !this.state.isProfileOpen})
  }

  render() {
    return <>
      <nav className="nav-bar">
        <LogInBtn clickHandler={this.clickHandlerSingIn}/>
        <SingUpBtn clickHandler={this.clickHandlerSingUp}/>
        <ProfileBtn clickHandler={this.clickHandlerProfile}/>
        <Profile clickHandler={this.clickHandlerProfile} isProfileOpen={this.state.isProfileOpen}/>
        <SingIn clickHandler={this.clickHandlerSingIn} isSingInMenuOpen={this.state.isSingInMenuOpen}/>
        <SingUp clickHandler={this.clickHandlerSingUp} isSingUpMenuOpen={this.state.isSingUpMenuOpen}/>
      </nav>
    </>;
  }
}

export default NavBar;
