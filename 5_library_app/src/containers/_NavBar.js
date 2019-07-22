import React from "react";
import {connect} from "react-redux";


class _NavBar extends React.PureComponent {
  state = {

  };

  render() {
    return (
      <nav className = "nav-bar">

      </nav>
    );
  }
}

const putStatetoProps = state => {
  return {user: state.user, modalMessage: state.modalMessage};
};

export default connect(putStatetoProps)(_NavBar);
