import React from "react";

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
      <div className="form-group">
        <label>Login</label>
        <input type="text" className="form-control" placeholder="Enter login" name="login" onChange={this.inputDataHandler}></input>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.inputDataHandler}></input>
      </div>
      <button type="submit" className="btn btn-primary">
        LogIn
      </button>
    </form>);
  }
}

export default (LogInForm);
