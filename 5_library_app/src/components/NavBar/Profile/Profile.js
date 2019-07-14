import React from 'react'
import './Profile.css'
import {connect} from "react-redux";
import classnames from 'classnames'
import profileGuest from '../ProfileBtn/profile-placeholder.png';

class Profile extends React.PureComponent {
  state={
    img: ''
  }

  componentDidUpdate() {
    if ('profilePicture' in this.props.user){
      var base64Flag = 'data:image/jpeg;base64,';
      var imageStr = this.arrayBufferToBase64(this.props.user.profilePicture.data);
      this.setState({
          img: base64Flag + imageStr
      })
    } else {
      this.setState({img: profileGuest})
    }
  }

  arrayBufferToBase64 = (buffer)=> {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  render() {
    let profileClassNames = classnames({
      'profile': this.props.isProfileOpen,
      'profile profile_disabled': !this.props.isProfileOpen
    });
    return (<div className={profileClassNames}>
      <div className="profile__background-cover"></div>
      <div className="profile__acaunt-details">
        <img className="profile-image" src={this.state.img}></img>
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
