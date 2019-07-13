import React from 'react'
import './Profile.css'
import {connect} from "react-redux";
import classnames from 'classnames'

class Profile extends React.PureComponent {
  render() {
    let profileClassNames = classnames({
      'profile': this.props.isProfileOpen,
      'profile profile_disabled': !this.props.isProfileOpen
    });
    return (<div className={profileClassNames}>
      <p>login: {this.props.user.login}</p>
      <p>email: {this.props.user.email}</p>
      <p>firstName: {this.props.user.firstName}</p>
      <p>lastName: {this.props.user.lastName}</p>
      <p>age: {this.props.user.age}</p>
    </div>)
  }
}

const putStateInProps = state => {
  return {user: state.user};
};

export default connect(putStateInProps)(Profile);
