import React from "react";
import { connect } from "react-redux";
import { Route } from 'react-router-dom';
import './Content.css'
import LogInFormContainer from '../../containers/LogInFormContainer'
import SingUpFormContainer from '../../containers/SingUpFormContainer'
import ProfileContainer from '../../containers/ProfileContainer'
import HomeContainer from '../../containers/HomeContainer'
import BookDetailContainer from '../../containers/BookDetailContainer'


class Content extends React.PureComponent {

  render() {
    let route = (this.props.userLogin!=="Guest")?(
      <Route path="/profile" component={ProfileContainer}/>
    ):(
      <>
        <Route path="/login" component={LogInFormContainer}/>
        <Route path="/singup" component={SingUpFormContainer}/>
      </>
    )
    return (
        <div className = "content">
          <Route path="/home" component={HomeContainer}/>
          <Route path="/book/:bookId/" component={BookDetailContainer}/>
          {route}
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLogin: state.user.login
  }
}

export default connect(mapStateToProps)(Content);
