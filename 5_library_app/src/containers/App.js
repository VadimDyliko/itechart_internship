import React from "react";
import { connect } from "react-redux";
import NavBar from "../components/NavBar/NavBar";
import Content from "../components/Content/Content";

import _NavBar from './_NavBar'

import {fetchUser } from "../store/actions";
import "./App.css";

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchUser())
  }

  render() {
    return (
      <div className="App">          
          <NavBar />
          <_NavBar/>
          <Content/>
      </div>
    );
  }
}

export default connect()(App);
