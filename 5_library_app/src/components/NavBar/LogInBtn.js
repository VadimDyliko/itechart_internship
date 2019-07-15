import React from "react";

class LogInBtn extends React.PureComponent {
  render() {
    return (
      <>
        <button className="btn btn-primary" onClick={this.props.clickHandler}>
          LogIn
        </button>
      </>
    );
  }
}

export default LogInBtn;
