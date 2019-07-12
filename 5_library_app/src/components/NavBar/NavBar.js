import React from "react";
import './NavBar.css'
import SingIn from "../SingIn/SingIn"
import SingUp from "../SingUp/SingUp"
//import LogInBtn from './LogInBtn'

class NavBar extends React.PureComponent {
  render() {
    return <>
      <nav className="nav-bar">
        <SingIn/>
        <SingUp/>
      </nav>
    </>;
  }
}

export default NavBar;
