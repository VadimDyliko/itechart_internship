import React from "react";
import classnames from "classnames";
import NavigationLink from '../NavigationLink/NavigationLink'
import './SideBar.css'
import logo from '../../images/logo.png'
import homeIcon from '../../images/home.png'
import searchIcon from '../../images/search.png'
import MenuTogleBtn from '../MenuTogleBtn'

class SideBar extends React.PureComponent {

  state={
    isOpen: false
  }

  isOpenHandler = () => {
    this.setState({isOpen:!this.state.isOpen})
  }

  clickHandler = () => {
    if (this.state.isOpen) this.setState({isOpen: false})
  }

  render() {
    let isMenuOpen = classnames({
      "nav-bar": !this.state.isOpen,
      "nav-bar nav-bar_open": this.state.isOpen,
    })
    return (<nav className={isMenuOpen}>
      <MenuTogleBtn isOpenHandler={this.isOpenHandler} isOpen={this.state.isOpen}/>
      <img className="nav-bar__logo" src={logo} alt="logo"/>
      <div onClick={this.clickHandler}>
        <NavigationLink toPath='/home' linkText='Home' icon={homeIcon}/>
        <NavigationLink toPath='/search' linkText='Search' icon={searchIcon}/>
        {this.props.children}
      </div>
    </nav>);
  }
}

export default SideBar;
