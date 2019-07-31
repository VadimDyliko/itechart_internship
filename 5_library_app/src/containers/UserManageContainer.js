import React from "react";
import {connect} from "react-redux";
import {suFetchUserData, suCancelBook, suReturnToBookStatus, suHandOutBook, suReturnBookToLibrary} from "../actions"
import UserManage from "../components/UserManage/UserManage"

class UserManageContainer extends React.PureComponent {

  componentDidMount() {
    this.props.onSuFetchUserData(this.props.match.params.userId)
  }

  suCancelBook = (userId, bookId) => {
    this.props.onSuCancelBook(userId, bookId)
     .then(()=>this.props.onSuFetchUserData(this.props.match.params.userId))
  }

  suReturnToBookStatus = (userId, bookId) => {
    this.props.onSuReturnToBookStatus(userId, bookId)
     .then(()=>this.props.onSuFetchUserData(this.props.match.params.userId))
  }

  suHandOutBook = (userId, bookId) => {
    this.props.onSuHandOutBook(userId, bookId)
     .then(()=>this.props.onSuFetchUserData(this.props.match.params.userId))
  }

  suReturnBookToLibrary = (userId, bookId) => {
    this.props.onSuReturnBookToLibrary(userId, bookId)
     .then(()=>this.props.onSuFetchUserData(this.props.match.params.userId))
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    return(
      <>
      <UserManage goBack={this.goBack} managedUser={this.props.managedUser} onSuCancelBook={this.suCancelBook} onSuReturnToBookStatus={this.suReturnToBookStatus} onSuHandOutBook={this.suHandOutBook} onSuReturnBookToLibrary={this.suReturnBookToLibrary}/>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    managedUser: state.su.managedUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSuFetchUserData: (userId) => dispatch(suFetchUserData(userId)),
    onSuCancelBook: (userId, bookId) => dispatch(suCancelBook(userId, bookId)),
    onSuReturnToBookStatus: (userId, bookId) => dispatch(suReturnToBookStatus(userId, bookId)),
    onSuHandOutBook: (userId, bookId) => dispatch(suHandOutBook(userId, bookId)),
    onSuReturnBookToLibrary: (userId, bookId) => dispatch(suReturnBookToLibrary(userId, bookId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManageContainer);
