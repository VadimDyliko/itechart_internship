import React from 'react'
import './Profile.css'
import {connect} from "react-redux";
import classnames from 'classnames'
import profileGuest from '../ProfileBtn/profile-placeholder.png';

class Profile extends React.PureComponent {
  state = {
    img: ''
  }

  componentDidUpdate() {
    if ('profilePicture' in this.props.user) {
      this.setState({img: this.props.user.profilePicture})
    } else {
      this.setState({img: profileGuest})
    }
  }

  // arrayBufferToBase64 = (buffer)=> {
  //   let base64Flag = 'data:image/jpeg;base64,';
  //   let binary = '';
  //   let bytes = [].slice.call(new Uint8Array(buffer));
  //   bytes.forEach((b) => binary += String.fromCharCode(b));
  //   let imageStr = window.btoa(binary)
  //   return base64Flag + imageStr
  // };

  render() {
    let profileClassNames = classnames({
      'profile': this.props.isProfileOpen,
      'profile profile_disabled': !this.props.isProfileOpen
    });
    return (<div className={profileClassNames}>
      <div className="profile__background-cover"></div>
      <div className="profile__acaunt-details">
        <img className="profile-image" src={this.state.img} alt="Profile"></img>
        <p>login: {this.props.user.login}</p>
        <p>email: {this.props.user.email}</p>
        <p>firstName: {this.props.user.firstName}</p>
        <p>lastName: {this.props.user.lastName}</p>
        <p>age: {this.props.user.age}</p>
      </div>
    </div>)
  }
}

const putStateInProps = state => {
  return {user: state.user};
};

export default connect(putStateInProps)(Profile);
