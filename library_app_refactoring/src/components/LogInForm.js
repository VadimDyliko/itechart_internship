import React from "react";
import classnames from "classnames";



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

    let singInFormClassNames = classnames({
      "sing-in-form": this.props.isSingInMenuOpen,
      "sing-in-form sing-in-form_disabled": !this.props.isSingInMenuOpen
    });


    return (<form className={singInFormClassNames} onSubmit={this.loginSubmitHundler}>
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
      <button type="button" className="btn btn-outline-primary">
        Close
      </button>
    </form>);
  }
}

export default (LogInForm);
