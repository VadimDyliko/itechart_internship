import React from "react";
import './LogInForm.css';

class LogInForm extends React.PureComponent {
  state={
    login:'',
    password:'',
  }

  inputDataHandler=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

  loginSubmitHundler=(e)=>{
    e.preventDefault();
    this.props.loginSubmitHundler(this.state);
  }

  render() {
    return (<form className="log-in-form" onSubmit={this.loginSubmitHundler}>
      <h2>Please, sign in:</h2>
      <div className="form-group">
        <p>Login</p>
        <input type="text" className="form-control" placeholder="Enter login" name="login" onChange={this.inputDataHandler}></input>
      </div>
      <div className="form-group">
        <p>Password</p>
        <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.inputDataHandler}></input>
      </div>
      <button type="submit" className="btn btn-primary">
        LogIn
      </button>
    </form>);
  }
}

export default (LogInForm);
