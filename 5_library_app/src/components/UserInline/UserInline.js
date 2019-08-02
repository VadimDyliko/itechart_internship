import React from 'react';
import './UserInline.css';

class UserInline extends React.PureComponent {

  clickHandler = () => {
    this.props.userInlineClickHandler(this.props.user._id)
  }

  render() {
    let { _id, login, email, bookingBooks, booksOnHand } = this.props.user
    return (
      <div className="user-inline" onClick={this.clickHandler}>
        <img src={`/user/avatar/${_id}`} className="user-inline__avatar" alt="avatar"/>
        <div className="user-inline__about">
          <p>{login}</p>
          <p className="banned-text">{this.props.user.isBan?'BANNED':''}</p>
          <p>{email}</p>
        </div>
        <div className="user-inline__about">
          <p>Books booked: {bookingBooks.length}</p>
          <p>Books on hands: {booksOnHand.length}</p>
        </div>
      </div>
    )
  }
}

export default UserInline;
