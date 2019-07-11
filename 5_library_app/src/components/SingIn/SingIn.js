import React from "react";

class SingIn extends React.Component {
  state = {
    email: "",
    password: ""
  };
  componentDidMount() {
    //fetch("/").then(res => console.log(res), err => console.log(err));
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/", true);
    xhr.send();
    xhr.onload = data => console.log(data);
  }
  emailHandler = e => {
    this.setState({ email: e.target.value });
  };
  passwordHandler = e => {
    this.setState({ email: e.target.value });
  };
  submitHandler = e => {
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  };
  render() {
    return (
      <form className="sing-in-form">
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default SingIn;
