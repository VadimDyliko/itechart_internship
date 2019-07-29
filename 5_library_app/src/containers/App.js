import React from "react";
import {connect} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import SideBarContainer from './SideBarContainer'
import ContentContainer from './ContentContainer'
import ModalMessage from '../components/ModalMessage/ModalMessage'
import {fetchUser, setModal} from "../actions";
import "./App.css";

class App extends React.PureComponent {

  componentDidMount() {
    this.props.onFetchUser()
  }

  closeModalMessage = () => {
    this.props.onSetModal()
  }

  render() {
    return (<BrowserRouter>
      <div className="App">
        <SideBarContainer/>
        <ContentContainer/>
        <ModalMessage isShow={this.props.isModalShow} modalTitle={this.props.modalTitle} modalText={this.props.modalText} closeModalMessage={this.closeModalMessage}/>
      </div>
    </BrowserRouter>);
  }
}

const mapStateToProps = state => {
  return {isModalShow: state.modalMessage.isShow, modalTitle: state.modalMessage.modalTitle, modalText: state.modalMessage.modalText}
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchUser: ()=>dispatch(fetchUser()),
    onSetModal: ()=>dispatch(setModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
