import React from "react";
import { connect } from "react-redux";
import { setUser, setModal } from "../../../store/actions";
import "./SingUp.css";
import classnames from "classnames";

class SingUp extends React.PureComponent {
  state = {
    login: "",
    email: "",
    password: "",
    emailIdentity: false,
    loginIdentity: false,
    profilePictureName: "Choose file",
    showSpiner: false
  };

  identityCheck = (key, target) => {
    fetch("/identityCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ [key]: target.value })
    }).then(res => {
      if (res.status !== 200) {
        this.setState({
          [key + "Identity"]: false
        });
        target.className = "form-control form-control__red";
      } else {
        this.setState({
          [key + "Identity"]: true
        });
        target.className = "form-control";
      }
    });
  };
  emailHandler = e => {
    this.setState({ email: e.target.value });
    this.identityCheck("email", e.target);
  };
  loginHandler = e => {
    this.setState({ login: e.target.value });
    this.identityCheck("login", e.target);
  };
  passwordHandler = e => {
    this.setState({ password: e.target.value });
  };
  profilePictureHandler = e => {
    let file = e.target.files[0];
    if (file) {
      if (e.target.files[0].type.split("/")[0] === "image") {
        this.setState({
          profilePicture: file,
          profilePictureName: file ? file.name : "Choose file"
        });
      } else {
        this.props.dispatch(
          setModal({
            isShow: true,
            modalTitle: "Invalid image type",
            modalText: "Choose valid image"
          })
        );
      }
    } else {
      this.setState({
        profilePicture: null,
        profilePictureName: "Choose file"
      });
    }
  };

  submitHandler = e => {
    e.preventDefault();
    if (this.state.emailIdentity && this.state.loginIdentity) {
      let formData = new FormData();
      formData.append("login", this.state.login);
      formData.append("email", this.state.email);
      formData.append("password", this.state.password);
      formData.append("profilePicture", this.state.profilePicture);
      this.setState({ showSpiner: true });
      fetch("/singup", {
        method: "POST",
        body: formData
      })
        .then(res => {
          this.setState({ showSpiner: false });
          if (res.status === 200) {
            this.props.clickHandler();
          } else if (res.status === 401) {
            this.props.dispatch(
              setModal({
                isShow: true,
                modalTitle: "Registration faild",
                modalText: "User is registred with such login or email"
              })
            );
            throw new Error("User is registred with such login or email");
          } else {
            this.props.dispatch(
              setModal({
                isShow: true,
                modalTitle: "Registration faild",
                modalText: "Set valid information"
              })
            );
            throw new Error("Set valid information");
          }
        })
        .then(() => {
          fetch("/profile")
            .then(res => res.json())
            .then(data => this.props.dispatch(setUser(data)));
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.props.dispatch(
        setModal({
          isShow: true,
          modalTitle: "Registration faild",
          modalText: "Set valid information"
        })
      );
    }
  };

  render() {
    let singUpSpiner = this.state.showSpiner ? (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      <> SingUp</>
    );

    let singUpFormClassNames = classnames({
      "sing-up-form": this.props.isSingUpMenuOpen,
      "sing-up-form sing-up-form_disabled": !this.props.isSingUpMenuOpen
    });
    return (
      <form className={singUpFormClassNames} onSubmit={this.submitHandler}>
        <div className="form-group">
          <p>Login</p>
          <input
            type="name"
            className="form-control"
            placeholder="Enter login"
            onChange={this.loginHandler}
          ></input>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Profile image</span>
          </div>
          <div className="custom-file">
            <input
              onChange={this.profilePictureHandler}
              type="file"
              className="custom-file-input"
              id="inputFileProfileImage"
              accept=".jpg, .jpeg, .png"
            ></input>
            <label
              className="custom-file-label"
              forhtml="inputFileProfileImage"
            >
              {this.state.profilePictureName}
            </label>
          </div>
        </div>
        <div className="form-group">
          <p>Email address</p>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={this.emailHandler}
          ></input>
          <small className="form-text text-muted">
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
        <button type="submit" className="btn btn-primary">
          {singUpSpiner}
        </button>
        <button
          type="button"
          onClick={this.props.clickHandler}
          className="btn btn-outline-primary"
        >
          Close
        </button>
      </form>
    );
  }
}

export default connect()(SingUp);
