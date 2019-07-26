import React from "react";
import './Profile.css';
import personIcon from '../../png/person.png'

class Profile extends React.PureComponent {

  render() {
    let userAvatarUrl = this.props.userId
      ? `/user/avatar/${this.props.userId}`
      : personIcon
    return (<div className="profile">
      <img className="profile__avatar" src={userAvatarUrl} alt="avatar"/>
      <p className="profile__login">{this.props.login}</p>
      <p className="profile__login">{this.props.email}</p>
      <button className="btn" onClick={this.props.LogOutHandler}>LogOut</button>
    </div>);
  }
}

export default Profile;
