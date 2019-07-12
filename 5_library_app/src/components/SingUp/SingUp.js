import React from "react";
import "./SingUp.css"

class SingUp extends React.Component {
  state = {
    login: "",
    email: "",
    password: "",
  };

  emailHandler = e => {
    this.setState({ email: e.target.value });
  };
  loginHandler = e => {
    this.setState({ login: e.target.value });
  };
  passwordHandler = e => {
    this.setState({ password: e.target.value });
  };

  submitHandler = e =>{
    let data = {
      login: this.state.login,
      email: this.state.email,
      password: this.state.password
    };
    fetch("/singup", {
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
        localStorage.setItem('token', token.jwt)
      });
  }

  render() {
    return (
      <div className="sing-up-form" style={{top: this.state.top}}>
        <div className="form-group">
          <p>Login</p>
          <input
            type="name"
            className="form-control"
            placeholder="Enter Login"
            onChange={this.nameHandler}
          ></input>
        </div>
        <div className="form-group">
          <p>Email address</p>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={this.emailHandler}
          ></input>
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <p>Password</p>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={this.passwordHandler}
          ></input>
        </div>
        <button onClick={this.submitHandler} className="btn btn-primary">
          SingUp
        </button>
      </div>
    );
  }
}

export default SingUp
