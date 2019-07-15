import React from 'react'
import './ProfileBtn.css'
import profilePlaceholder from './profile-placeholder.png'

class ProfileBtn extends React.PureComponent {

  state = {
    profilePicture: profilePlaceholder
  }

  componentDidMount() {
    if (this.props.profilePicture) {
      this.setState({profilePicture: this.props.profilePicture})
    }
  }

  render() {
    return (<div className="nav-bar__profile-btn" onClick={this.props.clickHandler}>
      <img className="profile-btn__avatar" src={this.state.profilePicture} alt="profile"></img>
    </div>)
  }
}

export default ProfileBtn
