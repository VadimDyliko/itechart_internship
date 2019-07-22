import React from "react";
import classnames from "classnames";

class SingUpForm extends React.PureComponent {
  state = {
    login: "",
    email: "",
    password: "",
    emailIdentity: false,
    loginIdentity: false,
    profilePictureName: "Choose file",
  };

  emailHandler = e => {
    this.setState({email: e.target.value});
    //this.props.identityCheck(e, 'email', e.target.value)
  };
  loginHandler = e => {
    this.setState({login: e.target.value});
    //this.props.identityCheck(e, 'login', e.target.value)
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
    let singUpFormClassNames = classnames({
      "sing-up-form": this.props.isSingUpMenuOpen,
      "sing-up-form sing-up-form_disabled": !this.props.isSingUpMenuOpen
    });
    return (<form className={singUpFormClassNames} onSubmit={this.submitHandler}>
      <div className="form-group">
        <p>Login</p>
        <input type="name" className="form-control" placeholder="Enter login" onChange={this.loginHandler}></input>
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Profile image</span>
        </div>
        <div className="custom-file">
          <input onChange={this.profilePictureHandler} type="file" className="custom-file-input" id="inputFileProfileImage" accept=".jpg, .jpeg, .png"></input>
          <label className="custom-file-label" forhtml="inputFileProfileImage">
            {this.state.profilePictureName}
          </label>
        </div>
      </div>
      <div className="form-group">
        <p>Email address</p>
        <input type="email" className="form-control" placeholder="Enter email" onChange={this.emailHandler}></input>
        <small className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <p>Password</p>
        <input type="password" className="form-control" placeholder="Password" onChange={this.passwordHandler}></input>
      </div>
      <button type="submit" className="btn btn-primary">
        SingUp
      </button>
      <button type="button" onClick={this.props.clickHandler} className="btn btn-outline-primary">
        Close
      </button>
    </form>);
  }
}

export default SingUpForm;
