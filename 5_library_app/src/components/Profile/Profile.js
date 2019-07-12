import React from 'react'
import './Profile.css'
import { connect } from "react-redux";

class Profile extends React.PureComponent{
  state={
    user:{}
  }
  componentWillUpdate(nextProps, nextState) {

    if (nextProps.token!==this.props.token){
      fetch("/profile", {
        method: "GET",
        headers: { "Authorization": `${nextProps.token}`}
        //headers: { "Authorization": `${localStorage.getItem('token')}`}
      })
      .then(res=>res.json())
      .then(data=>this.setState({user: data}))
    }
  }

    componentDidMount() {
      if (localStorage.getItem('token')){
        fetch("/profile", {
          method: "GET",
          headers: { "Authorization": `${localStorage.getItem('token')}`}
        })
        .then(res=>res.json())
        .then(data=>this.setState({user: data}))
      }
    }


  render () {
    return (
      <div className="profile">
      </div>
    )
  }
}

const putStateInProps = state => {
  return {
    token: state.token
  };
};

export default connect(
  putStateInProps
)(Profile);
