import React from "react";
import {connect} from "react-redux";
import SingUpForm from '../components/SingUpForm';
import {singUpUser} from '../actions'



class SingUpFormContainer extends React.PureComponent {

  singUpSubmitHandler = (data) =>{
    this.props.dispatch(singUpUser(data))
      .then(()=>this.props.history.push('/'))
  }

  identityCheck = (e, key, target) => {
    fetch("/identityCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({[key]: target})
    }).then(res => {
      if (res.status !== 200) {
        console.log(res);
        // this.setState({
        //   [key + "Identity"]: false
        // });
         e.target.className = "form-control form-control__red";
      } else {
        // this.setState({
        //   [key + "Identity"]: true
        // });
        e.target.className = "form-control";
      }
    });
  };

  render() {
    return (
      <SingUpForm singUpSubmitHandler={this.singUpSubmitHandler} identityCheck={this.identityCheck}/>
    );
  }
}

export default connect()(SingUpFormContainer);
