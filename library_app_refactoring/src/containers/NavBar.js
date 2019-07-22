import React from "react";
import {connect} from "react-redux";
import NavigationLink from '../components/NavigationLink'
import './NavBar.css'
import logo from './logo.png'
import personIcon from '../png/person.png'
import personAddIcon from '../png/person_add.png'
import homeIcon from '../png/home.png'


class NavBar extends React.PureComponent {
  state = {

  };

  render() {
    return (
      <nav className="nav-bar">
        <img className="nav-bar__logo" src={logo} alt="logo"/>
        <NavigationLink toPath='/' linkText='Home' icon={homeIcon}/>
        <NavigationLink toPath='/search' linkText='Search' icon={homeIcon}/>
        <NavigationLink toPath='/yourlibrary' linkText='Your Library' icon={homeIcon}/>
        <NavigationLink toPath='/login/' linkText='Login' icon={personIcon}/>
        <NavigationLink toPath='/singup/' linkText='SingUp' icon={personAddIcon}/>
        <NavigationLink toPath='/profile/' linkText='Profile' icon={personIcon}/>
      </nav>
    );
  }
}

const putStatetoProps = state => {
  return {user: state.user};
};

export default connect(putStatetoProps)(NavBar);
