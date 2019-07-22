import React from "react";
import {connect} from "react-redux";
import { loginUser} from "../../../store/actions";
import "./SingIn.css";
import classnames from "classnames";



class SingIn extends React.PureComponent {
  state = {
    email: "",
    password: "",
    showSpiner: false
  };



  loginHandler = e => {
    this.setState({login: e.target.value});
  };
  passwordHandler = e => {
    this.setState({password: e.target.value});
  };
  submitHandler = e => {
    let data = {
      login: this.state.login,
      password: this.state.password
    };
    this.props.dispatch(loginUser(data))
  };



  render() {


    let logInSpiner = this.state.showSpiner
      ? (<div className="singInSpinner spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>)
      : (<> LogIn</>);
    let singInFormClassNames = classnames({
      "sing-in-form": this.props.isSingInMenuOpen,
      "sing-in-form sing-in-form_disabled": !this.props.isSingInMenuOpen
    });


    return (<div className={singInFormClassNames}>
      <div className="form-group">
        <label>Login</label>
        <input type="login" className="form-control" placeholder="Enter login" onChange={this.loginHandler}></input>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Password" onChange={this.passwordHandler}></input>
      </div>
      <button type="submit" onClick={this.submitHandler} className="btn btn-primary">
        {logInSpiner}
      </button>
      <button type="button" onClick={this.props.clickHandler} className="btn btn-outline-primary">
        Close
      </button>
    </div>);
  }
}

export default connect()(SingIn);
