import React from 'react'
import "./UserManage.css"
import BookedBook from '../BookedBook/BookedBook'
import BookOnHand from '../BookOnHand/BookOnHand'
import UserManageBookedBook from '../UserManageBook/UserManageBookedBook'
import UserManageHandOutBook from '../UserManageBook/UserManageHandOutBook'


class UserManage extends React.PureComponent {
  render () {
    let user = this.props.managedUser
    let {_id, login, email} = user?user:''
    return(
      <div className="user-manage">
        <button onClick={this.props.goBack} className="btn">Go back</button>
        <img src={`/user/avatar/${_id}`} className="user-manage__avatar" alt="avatar"/>
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
