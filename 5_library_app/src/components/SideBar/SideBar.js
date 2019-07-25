import React from "react";
import NavigationLink from '../NavigationLink/NavigationLink'
import './SideBar.css'
import logo from '../../png/logo.png'
import homeIcon from '../../png/home.png'
import bookIcon from '../../png/book.png'
import searchIcon from '../../png/search.png'

class SideBar extends React.PureComponent {

  render() {
    return (<nav className="nav-bar">
      <img className="nav-bar__logo" src={logo} alt="logo"/>
      <NavigationLink toPath='/home' linkText='Home' icon={homeIcon}/>
      <NavigationLink toPath='/search' linkText='Search' icon={searchIcon}/>
      <NavigationLink toPath='/yourlibrary' linkText='Your Library' icon={bookIcon}/> {this.props.children}
    </nav>);
  }
}

export default SideBar;
