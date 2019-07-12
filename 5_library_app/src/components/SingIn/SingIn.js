import React from "react";
import "./SingIn.css";
import { setToken } from "../../store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class SingIn extends React.Component {
  state = {
    email: "",
    password: "",
    top: "0",
  };

  emailHandler = e => {
    this.setState({ email: e.target.value });
  };
  passwordHandler = e => {
    this.setState({ password: e.target.value });
  };
  submitHandler = e => {
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        let parsedRes = res.json();
        return parsedRes
      })
      .then(token => {
        this.props.setToken(token.jwt);
        localStorage.setItem('token', token.jwt)
      });
  };
  render() {
    return (
      <div className="sing-in-form" style={{top: this.state.top}}>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={this.emailHandler}
          ></input>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={this.passwordHandler}
          ></input>
        </div>
        <button onClick={this.submitHandler} className="btn btn-primary">
          LogIn
        </button>
      </div>
    );
  }
}

const putStateInProps = state => {
  return {
    token: state.token
  };
};

const putActionsInProps = dispatch => {
  return {
    setToken: bindActionCreators(setToken, dispatch)
  };
};

export default connect(
  putStateInProps, putActionsInProps
)(SingIn);
