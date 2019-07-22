import React from "react";
import { connect } from "react-redux";
import NavBar from './NavBar'
import ModalMessage from '../components/ModalMessage'

import {fetchUser, setModal } from "../actions";
import "./App.css";

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchUser())
  }

  closeModalMessage() {
    this.props.dispatch(setModal({isShow: false}))
  }

  render() {
    return (
      <div className="App">
          <button onClick={this.closeModalMessage}>asa</button>
          <ModalMessage isShow={this.props.isModalShow} modalTitle={this.props.modalTitle} modalText={this.props.modalText} closeModalMessage={this.closeModalMessage}/>
          <NavBar/>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    isModalShow: state.modalMessage.isShow,
    modalTitle: state.modalMessage.modalTitle,
    modalText: state.modalMessage.modalText
  }
}

export default connect(mapStateToProps)(App);
