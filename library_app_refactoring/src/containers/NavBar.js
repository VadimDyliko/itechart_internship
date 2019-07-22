import React from "react";
import {connect} from "react-redux";
import LogInBtn from '../components/LogInBtn'
import LogOutBtn from '../components/LogOutBtn'
import SingUpBtn from '../components/SingUpBtn'
import LogInFormContainer from '../containers/LogInFormContainer'
import SingUpFormContainer from '../containers/SingUpFormContainer'
import {logOutUser} from '../actions'


class NavBar extends React.PureComponent {
  state = {

  };

  LogOutHandler = e =>{
    this.props.dispatch(logOutUser())
  }



  render() {
    return (
      <nav className = "nav-bar">
        <LogInBtn clickHandler={this.LoginFormTogle}/>
        <LogOutBtn clickHandler={this.LogOutHandler}/>
        <SingUpBtn clickHandler={this.SingUpFormTogle}/>
        <LogInFormContainer/>
        <SingUpFormContainer/>
      </nav>
    );
  }
}

const putStatetoProps = state => {
  return {user: state.user};
};

export default connect(putStatetoProps)(NavBar);
