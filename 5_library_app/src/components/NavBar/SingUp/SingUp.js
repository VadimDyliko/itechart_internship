import React from "react";
import {connect} from 'react-redux'
import {setUser} from '../../../store/actions'
import "./SingUp.css"
import classnames from 'classnames'

class SingUp extends React.PureComponent {
  state = {
    login: "",
    email: "",
    password: ""
  };

  emailHandler = e => {
    this.setState({email: e.target.value});
  };
  loginHandler = e => {
    this.setState({login: e.target.value});
  };
  passwordHandler = e => {
    this.setState({password: e.target.value});
  };
  profilePictureHandler = e => {
    this.setState({profilePicture: e.target.files[0]});
    console.log(this.state.profilePicture);
  };

  // submitHandler = e => {
  //   let formData = new FormData();
  //   formData.append('login', this.state.login)
  //   formData.append('email', this.state.email)
  //   formData.append('password', this.state.password)
  //   formData.append('profilePicture', this.state.profilePicture)
  //   console.log(formData);
  //   fetch("/test", {
  //     method: "POST",
  //     body: formData
  //   })
  // }
  submitHandler = e => {
    // let data = {
    //   login: this.state.login,
    //   email: this.state.email,
    //   password: this.state.password
    // };
    // fetch("/singup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // })
      let formData = new FormData();
      formData.append('login', this.state.login)
      formData.append('email', this.state.email)
      formData.append('password', this.state.password)
      formData.append('profilePicture', this.state.profilePicture)
      console.log(formData);
      fetch("/singup", {
        method: "POST",
        body: formData
      })
      .then(res => {
      if (res.status === 200) {
        this.props.clickHandler()
      } else if (res.status === 401) {
        alert('user is registred with such login or email')
        throw new Error('user is registred with such login or email');
      }
    }).then(() => {
      fetch("/profile").then((res) => res.json()).then(data => this.props.dispatch(setUser(data)))
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    let singUpFormClassNames = classnames({
      'sing-up-form': this.props.isSingUpMenuOpen,
      'sing-up-form sing-up-form_disabled': !this.props.isSingUpMenuOpen
    });
    return (<div className={singUpFormClassNames}>
      <div className="form-group">
        <p>Login</p>
        <input type="name" className="form-control" placeholder="Enter login" onChange={this.loginHandler}></input>
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroupFileAddon01">Profile image</span>
        </div>
        <div className="custom-file">
          <input onChange={this.profilePictureHandler} type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"></input>
          <label className="custom-file-label" forhtml="inputGroupFile01">Choose file</label>
        </div>
      </div>
      <div className="form-group">
        <p>Email address</p>
        <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.emailHandler}></input>
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <p>Password</p>
        <input type="password" className="form-control" placeholder="Password" onChange={this.passwordHandler}></input>
      </div>
      <button onClick={this.submitHandler} className="btn btn-primary">
        SingUp
      </button>
      <button onClick={this.props.clickHandler} className="btn btn-outline-primary">
        Close
      </button>
    </div>);
  }
}

export default connect()(SingUp)
