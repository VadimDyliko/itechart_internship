import React from 'react'

class LogOutBtn extends React.PureComponent{

  render(){
    return(
        <>
          <button className="btn btn-primary" onClick={this.props.clickHandler}>LogOut</button>
        </>
    )
  }
}

export default LogOutBtn
