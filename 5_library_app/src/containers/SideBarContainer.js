import React from "react";
import { connect } from "react-redux";
import NavigationLink from '../components/NavigationLink/NavigationLink';
import personIcon from '../images/person.png';
import personAddIcon from '../images/person_add.png';
import bookIcon from '../images/book.png';
import SideBar from '../components/SideBar/SideBar';

class SideBarContainer extends React.PureComponent {

    render() {
      let profileIcon = this.props.userId ?
        `/user/avatar/${this.props.userId}` :
        personIcon
      let links = (this.props.userLogin !== 'Guest') ?
        (<>
          <NavigationLink toPath='/yourlibrary' linkText='Your Library' icon={bookIcon}/>
          <NavigationLink toPath='/profile/' linkText='Profile' icon={profileIcon}/>
        </>) :
        (<>
          <NavigationLink toPath = '/login/' linkText = 'Login' icon = {personIcon}/>
          <NavigationLink toPath='/singup/' linkText='SingUp' icon={personAddIcon}/>
        </>)
      let suLinks = this.props.su ?
        <>
          <NavigationLink toPath = '/addbook/' linkText = 'Add new book' icon = { bookIcon}/>
          <NavigationLink toPath='/managebooks/' linkText='Manage books' icon={bookIcon}/>
          <NavigationLink toPath = '/manageusers/' linkText = 'Manage users' icon = { personIcon }/>
        </>: null
        return (
          <SideBar userLogin={this.props.userLogin}>
            {suLinks}
            {links}
          </SideBar>
        )}
    }

    const putStatetoProps = state => {
      return { userLogin: state.user.login, userId: state.user._id, su: state.user.su };
    };

    export default connect(putStatetoProps)(SideBarContainer);
