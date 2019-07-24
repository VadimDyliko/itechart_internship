import React from "react";
import './Profile.css';

class Profile extends React.PureComponent {

  render() {
    return (
        <div className = "profile">
          <img className="profile__avatar" src={this.props.profilePicture} alt="avatar"/>
          <p className="profile__login">{this.props.login}</p>
          <p className="profile__login">{this.props.email}</p>
          <button className="btn" onClick={this.props.LogOutHandler}>LogOut</button>
        </div>
    );
  }
}


export default Profile;
