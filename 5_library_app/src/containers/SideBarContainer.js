import React from "react";
import {connect} from "react-redux";
import NavigationLink from '../components/NavigationLink/NavigationLink'
import personIcon from '../png/person.png'
import personAddIcon from '../png/person_add.png'
import SideBar from '../components/SideBar/SideBar'

class SideBarContainer extends React.PureComponent {

  render() {
    let profileIcon = this.props.userId
      ? `/user/avatar/${this.props.userId}`
      : personIcon
    let links = (this.props.userLogin !== 'Guest')
      ? (<NavigationLink toPath='/profile/' linkText='Profile' icon={profileIcon}/>)
      : (<> < NavigationLink toPath = '/login/' linkText = 'Login' icon = {
        personIcon
      } /> <NavigationLink toPath='/singup/' linkText='SingUp' icon={personAddIcon}/>
    </>)
    return (<SideBar userLogin={this.props.userLogin}>
      {links}
    </SideBar>);
  }
}

const putStatetoProps = state => {
  return {userLogin: state.user.login, userId: state.user._id};
};

export default connect(putStatetoProps)(SideBarContainer);
