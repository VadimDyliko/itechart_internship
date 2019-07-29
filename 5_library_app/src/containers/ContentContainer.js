import React from "react";
import {connect} from "react-redux";
import {Route} from 'react-router-dom';
import LogInFormContainer from './LogInFormContainer'
import SingUpFormContainer from './SingUpFormContainer'
import ProfileContainer from './ProfileContainer'
import Content from '../components/Content/Content'
import BookManageContainer from "./BookManageContainer"

class ContentContainer extends React.PureComponent {
  render() {
    let route = (this.props.userLogin !== "Guest")
      ? (<Route path="/profile" component={ProfileContainer}/>)
      : (<> < Route path = "/login" component = {
        LogInFormContainer
      } /> <Route path="/singup" component={SingUpFormContainer}/>
    </>)
    let suContent = this.props.su?(
      <Route path="/book/:bookId/manage" component={BookManageContainer}/>
    ):null
    return (<Content>
      {route}
      {suContent}
    </Content>);
  }
}

const mapStateToProps = state => {
  return {
    userLogin: state.user.login,
    su: state.user.su
  }
}

export default connect(mapStateToProps)(ContentContainer);
