import React from "react";
import {connect} from 'react-redux';
import {setUser} from '../../../store/actions'
import "./SingIn.css";
import classnames from "classnames"

class SingIn extends React.PureComponent {
  state = {
    email: "",
    password: ""
  };

  emailHandler = e => {
    this.setState({email: e.target.value});
  };
  passwordHandler = e => {
    this.setState({password: e.target.value});
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
    }).then(res => {
      if (res.status === 200) {
        this.props.clickHandler()
      }
    }).then(() => {
      fetch("/profile")
      .then((res) => {
        if (res.status === 200){
          return res.json()
        } else {
          // throw new Error ('did not autentificated')
        }
      })
      .then(data => this.props.dispatch(setUser(data)))})
      .catch(err => console.log(err))
  };
  render() {
    let singInFormClassNames = classnames({
      'sing-in-form': this.props.isSingInMenuOpen,
      'sing-in-form sing-in-form_disabled': !this.props.isSingInMenuOpen
    });
    return (<div className={singInFormClassNames}>
      <div className="form-group">
        <label>Login</label>
        <input type="login" className="form-control" aria-describedby="emailHelp" placeholder="Enter login" onChange={this.emailHandler}></input>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Password" onChange={this.passwordHandler}></input>
      </div>
      <button type="submit" onClick={this.submitHandler} className="btn btn-primary">
        LogIn
      </button>

      <button type="button" onClick={this.props.clickHandler} className="btn btn-outline-primary">
        Close
      </button>
    </div>);
  }
}

export default connect()(SingIn)
