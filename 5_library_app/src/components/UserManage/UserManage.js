import React from 'react'
import "./UserManage.css"
import UserManageBookedBook from '../UserManageBook/UserManageBookedBook'
import UserManageHandOutBook from '../UserManageBook/UserManageHandOutBook'
import personIcon from '../../images/person.png'

class UserManage extends React.PureComponent {

    state = {
      banReason: ''
    }

    onSuBanUser = () => {
      this.props.onSuBanUser(this.props.managedUser._id, this.state.banReason, !this.props.managedUser.isBan)
    }

    inputHandler = e => {
      this.setState({ banReason: e.target.value })
    }

    render() {
      let user = this.props.managedUser;
      let { _id, login, email, isBan, ban } = user ? user : '';
      let avatar = user ? `/user/avatar/${_id}` : personIcon;
      let banContent = isBan?(
        <>
          <p className="banned-text">BANNED</p>
          <p className="banned-text">{ban.reason}</p>
          <p className="banned-text">{new Date(+user.ban.date).toLocaleString()}</p>
        </>):null
        return (
          <div className="user-manage">
        <div className="user-manage__controls">
          <button onClick={this.props.goBack} className="close-btn">&#x2613;</button>
          <div>
            <input type="text" className="user-manage__input form-control" onChange={this.inputHandler} placeholder="Enter ban/unban reason"/>
            <button onClick={this.onSuBanUser} className="btn">{isBan?'UNBAN':'BAN'}</button>
          </div>
        </div>
        <img src={avatar} className="user-manage__avatar" alt="avatar"/>
          {banContent}
          <p className="user-manage__login">{login}</p>
          <p className="user-manage__login">{email}</p>
          <p>Booked books:</p>
          {user?user.bookingBooks.map(book=>{
            book.key = book.bookId+book.dateOfBook
            return <UserManageBookedBook key={book.key} book={book} suCancel={this.props.onSuCancelBook} userId={_id} suHandOutBook={this.props.onSuHandOutBook}/>
          }):null}
          <p>Books on hand:</p>
          {user?user.booksOnHand.map(book=>{
            return <UserManageHandOutBook key={book.bookId} book={book} userId={_id} suCancel={this.props.onSuReturnToBookStatus} suReturnBookToLibrary={this.props.onSuReturnBookToLibrary}/>
          }):null}
      </div>
        )
      }
    }

    export default UserManage;
