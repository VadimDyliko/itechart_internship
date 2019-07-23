import React from "react";
import {connect} from "react-redux";
import NavigationLink from '../components/NavigationLink'
import './NavBar.css'
import logo from './logo.png'
import personIcon from '../png/person.png'
import personAddIcon from '../png/person_add.png'
import homeIcon from '../png/home.png'

class NavBar extends React.PureComponent {

  render() {
    let profileIcon = this.props.userProfilePicture?this.props.userProfilePicture:personIcon
    let links = (this.props.userLogin!=='Guest')?(
      <NavigationLink toPath='/profile/' linkText='Profile' icon={profileIcon}/>
    ):(
      <>
      <NavigationLink toPath='/login/' linkText='Login' icon={personIcon}/>
      <NavigationLink toPath='/singup/' linkText='SingUp' icon={personAddIcon}/>
      </>
    )
    return (
      <nav className="nav-bar">
        <img className="nav-bar__logo" src={logo} alt="logo"/>
        <NavigationLink toPath='/home' linkText='Home' icon={homeIcon}/>
        <NavigationLink toPath='/search' linkText='Search' icon={homeIcon}/>
        <NavigationLink toPath='/yourlibrary' linkText='Your Library' icon={homeIcon}/>
        {links}
      </nav>
    );
  }
}

const putStatetoProps = state => {
  return {userLogin: state.user.login, userProfilePicture: state.user.profilePicture};
};

export default connect(putStatetoProps)(NavBar);
