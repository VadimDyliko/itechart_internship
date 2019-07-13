import React from 'react'
import './ProfileBtn.css'

class ProfileBtn extends React.PureComponent {
  render() {
    return (<div className="nav-bar__profile-btn" onClick={this.props.clickHandler}></div>)
  }
}

export default ProfileBtn
