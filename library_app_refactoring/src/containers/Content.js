import React from "react";
import { Route } from 'react-router-dom';
import './Content.css'
import LogInFormContainer from '../containers/LogInFormContainer'
import SingUpFormContainer from '../containers/SingUpFormContainer'
import ProfileContainer from '../containers/ProfileContainer'


class Content extends React.PureComponent {

  render() {
    return (
        <div className = "content">
          <Route path="/login" component={LogInFormContainer}/>
          <Route path="/singup" component={SingUpFormContainer}/>
          <Route path="/profile" component={ProfileContainer}/>
        </div>
    );
  }
}


export default Content;
