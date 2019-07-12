import React from "react";

class SingIn extends React.Component {
  state = {
    email: "",
    password: ""
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
    }).then(res => console.log(res.json()));
  };
  render() {
    return (
      <div className="sing-in-form">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={this.emailHandler}
          ></input>
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={this.passwordHandler}
          ></input>
        </div>
        <button onClick={this.submitHandler} className="btn btn-primary">
          Submit
        </button>
      </div>
    );
  }
}

export default SingIn;
