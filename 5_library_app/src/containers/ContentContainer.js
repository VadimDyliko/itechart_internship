import React from "react";
import {connect} from "react-redux";
import {Route} from 'react-router-dom';
import LogInFormContainer from './LogInFormContainer'
import SingUpFormContainer from './SingUpFormContainer'
import ProfileContainer from './ProfileContainer'
import Content from '../components/Content/Content'

class ContentContainer extends React.PureComponent {
  render() {
    let route = (this.props.userLogin !== "Guest")
      ? (<Route path="/profile" component={ProfileContainer}/>)
      : (<> < Route path = "/login" component = {
        LogInFormContainer
      } /> <Route path="/singup" component={SingUpFormContainer}/>
    </>)
    return (<Content>
      {route}
    </Content>);
  }
}

const mapStateToProps = state => {
  return {userLogin: state.user.login}
}

export default connect(mapStateToProps)(ContentContainer);
