import React from "react";
import './Profile.css'
import LogOutBtn from './LogOutBtn'

class Profile extends React.PureComponent {

  render() {
    return (
        <div className = "profile">
          <img className="profile__avatar" src={this.props.profilePicture} alt="avatar"/>
          <p className="profile__login">{this.props.login}</p>
          <p className="profile__login">{this.props.email}</p>
          <LogOutBtn clickHandler={this.props.LogOutHandler}/>
        </div>
    );
  }
}


export default Profile;
