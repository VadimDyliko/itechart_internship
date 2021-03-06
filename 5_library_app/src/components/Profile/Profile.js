import React from "react";
import './Profile.css';
import personIcon from '../../images/person.png'
import YourLibraryContainer from "../../containers/YourLibraryContainer"

class Profile extends React.PureComponent {

  render() {
    let userAvatarUrl = this.props.userId ?
      `/user/avatar/${this.props.userId}` :
      personIcon
    return (<div className="profile">
      <img className="profile__avatar" src={userAvatarUrl} alt="avatar"/>
      <p className="banned-text">{this.props.isBan?'BANNED':''}</p>
      <p className="profile__login">{this.props.login}</p>
      <p className="profile__login">{this.props.email}</p>
      <button className="btn" onClick={this.props.LogOutHandler}>LogOut</button>
      <YourLibraryContainer/>
    </div>);
  }
}

export default Profile;
