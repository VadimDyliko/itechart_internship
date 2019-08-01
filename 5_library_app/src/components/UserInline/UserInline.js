import React from 'react';
import {Link} from "react-router-dom";
import './UserInline.css';

class UserInline extends React.PureComponent {

  render() {
    let {_id, login, email} = this.props.user
    return (
      <div className="user-inline">
        <img src={`/user/avatar/${_id}`} className="user-inline__avatar" alt="avatar"/>
        <div className="user-inline__about">
          <Link to={`/manageusers/${_id}`} className="user-inline-link">
            <p>{login}</p>
          </Link>
          <p className="banned-text">{this.props.user.isBan?'BANED':''}</p>
          <p>{email}</p>
        </div>
      </div>
  )
  }
}

export default UserInline;
