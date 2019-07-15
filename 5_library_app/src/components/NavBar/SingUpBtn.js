import React from "react";

class SingUpBtn extends React.PureComponent {
  render() {
    return (
      <>
        <button className="btn btn-primary" onClick={this.props.clickHandler}>
          SingUp
        </button>
      </>
    );
  }
}

export default SingUpBtn;
