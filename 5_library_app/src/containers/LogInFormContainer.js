import React from "react";
import { connect } from "react-redux";
import LogInForm from '../components/LogInForm/LogInForm';
import { loginUser } from '../actions';

class LogInFormContainer extends React.PureComponent {

  loginSubmitHundler = (data) => {
    this.props.onLoginUser(data).then(() => this.props.history.push('/home')).catch((err) => console.log(err))
  }

  render() {
    return (<LogInForm loginSubmitHundler={this.loginSubmitHundler}/>);
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUser: (data) => dispatch(loginUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInFormContainer);
