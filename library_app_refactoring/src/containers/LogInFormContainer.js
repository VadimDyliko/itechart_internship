import React from "react";
import {connect} from "react-redux";
import LogInForm from '../components/LogInForm';
import {loginUser} from '../actions'



class LogInFormContainer extends React.PureComponent {

  loginSubmitHundler = (data) =>{
    console.log(this.props.history);
    this.props.dispatch(loginUser(data))
      .then(()=>this.props.history.push('/'))
  }

  render() {
    return (
      <LogInForm loginSubmitHundler={this.loginSubmitHundler}/>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    user:state.user
  }
}

export default connect(mapStateToProps)(LogInFormContainer);
