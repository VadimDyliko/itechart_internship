import React from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NavBar from './NavBar/NavBar'
import Content from './Content/Content'
import ModalMessage from '../components/ModalMessage'

import {fetchUser, setModal } from "../actions";
import "./App.css";

class App extends React.PureComponent {

  componentDidMount() {
    this.props.dispatch(fetchUser())
  }

  closeModalMessage = () => {
    this.props.dispatch(setModal())
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
              <NavBar/>
              <Content/>
              <ModalMessage isShow={this.props.isModalShow} modalTitle={this.props.modalTitle} modalText={this.props.modalText} closeModalMessage={this.closeModalMessage}/>
        </div>
      </BrowserRouter>
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
