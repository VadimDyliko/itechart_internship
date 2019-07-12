import React from "react";
import "./SingUp.css"
import classnames from 'classnames'

class SingUp extends React.PureComponent {
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
      })
      .catch(err=>console.log(err))
  }

  render() {
    let singUpFormClassNames = classnames({
      'sing-up-form': this.props.isSingUpMenuOpen,
      'sing-up-form sing-up-form_disabled': !this.props.isSingUpMenuOpen
    });
    return (
      <div className={singUpFormClassNames}>
        <div className="form-group">
          <p>Login</p>
          <input
            type="name"
            className="form-control"
            placeholder="Enter Login"
            onChange={this.loginHandler}
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
        <button onClick={this.props.clickHandler} className="btn btn-primary">
          Close
        </button>
      </div>
    );
  }
}

export default SingUp
