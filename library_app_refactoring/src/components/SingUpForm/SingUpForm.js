import React from "react";
import classnames from "classnames";
import './SingUpForm.css'

class SingUpForm extends React.PureComponent {
  state = {
    login: "",
    email: "",
    password: "",
    profilePictureName: "Choose file",
  };

  emailHandler = e => {
    this.setState({email: e.target.value});
    this.props.identityCheck(e, 'email')
  };
  loginHandler = e => {
    this.setState({login: e.target.value});
    this.props.identityCheck(e, 'login')
  };
  passwordHandler = e => {
    this.setState({password: e.target.value});
  };
  profilePictureHandler = e => {
    let file = e.target.files[0];
    if (file) {
      if (e.target.files[0].type.split("/")[0] === "image") {
        this.setState({
          profilePicture: file,
          profilePictureName: file
            ? file.name
            : "Choose file"
        });
      } else {
        //this.props.dispatch(setModal({isShow: true, modalTitle: "Invalid image type", modalText: "Choose valid image"}));
      }
    } else {
      this.setState({profilePicture: null, profilePictureName: "Choose file"});
    }
  };


  submitHandler = e =>{
    e.preventDefault();
    this.props.singUpSubmitHandler(this.state)
  }

  render() {
    let isLoginValid = classnames({
      "form-control is-valid": this.props.isLoginValid,
      "form-control is-invalid": !this.props.isLoginValid
    })
    let isEmailValid = classnames({
      "form-control is-valid": this.props.isEmailValid,
      "form-control is-invalid": !this.props.isEmailValid
    })
    return (<form className="sing-up-form" onSubmit={this.submitHandler}>
        <p className="sing-up-form__labels-text">Login</p>
        <input type="name" className={isLoginValid} placeholder="Enter login" onChange={this.loginHandler}></input>
        <div className="input-group-prepend">
          <p className="sing-up-form__labels-text">Profile image</p>
        </div>
        <div className="custom-file">
          <input onChange={this.profilePictureHandler} type="file" className="custom-file-input" id="inputFileProfileImage" accept=".jpg, .jpeg, .png"></input>
        </div>
        <p className="sing-up-form__labels-text">Email address</p>
        <input type="email" className={isEmailValid} placeholder="Enter email" onChange={this.emailHandler}></input>
        <p className="form-text text-muted">We'll never share your email with anyone else.</p>
        <p className="sing-up-form__labels-text">Password</p>
        <input type="password" className="form-control" placeholder="Password" onChange={this.passwordHandler}></input>
        <button type="submit" className="btn btn-primary">
          SingUp
        </button>
    </form>);
  }
}

export default SingUpForm;
