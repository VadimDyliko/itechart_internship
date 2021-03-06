import React from "react";
import { connect } from "react-redux";
import SingUpForm from '../components/SingUpForm/SingUpForm';
import { singUpUser, setModal } from '../actions';
import { emailRegExp } from '../constants/regExp';

class SingUpFormContainer extends React.PureComponent {

  state = {
    email: false,
    login: false
  }

  singUpSubmitHandler = (data) => {
    if (this.state.login && this.state.email && data.profilePicture) {
      this.props.onSingUpUser(data).then(() => this.props.history.push('/home')).catch((err) => console.log(err))
    } else {
      this.onSetModal({ isShow: true, modalTitle: "Registration faild", modalText: "Set valid information" });
    }
  }

  onSetModal = (data) => {
    this.props.onSetModal(data)
  }

  identityCheck = (e, key) => {
    if (e.target.value === '') {
      this.setState({ [key]: false })
      return
    } else if (key === 'email' && !e.target.value.match(emailRegExp)) {
      this.setState({ [key]: false })
      return
    }
    fetch("/identityCheck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: e.target.value })
    }).then(res => {
      if (res.status !== 200) {
        this.setState({ [key]: false })
      } else {
        this.setState({ [key]: true })
      }
    });
  };

  render() {
    return (
      <SingUpForm singUpSubmitHandler={this.singUpSubmitHandler} identityCheck={this.identityCheck} isLoginValid={this.state.login} isEmailValid={this.state.email} onSetModal={this.onSetModal}/>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSingUpUser: (data) => dispatch(singUpUser(data)),
    onSetModal: (data) => dispatch(setModal(data))
  }
}

export default connect(null, mapDispatchToProps)(SingUpFormContainer);
