import React from 'react'
import './Profile.css'
import { connect } from "react-redux";
import classnames from 'classnames'

class Profile extends React.PureComponent{
  render () {
    let profileClassNames = classnames({
      'profile': this.props.isProfileOpen,
      'profile profile_disabled': !this.props.isProfileOpen
    });
    return (
      <div className={profileClassNames}>
        <p>login: {this.props.user.login}</p>
      </div>
    )
  }
}

const putStateInProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  putStateInProps
)(Profile);
