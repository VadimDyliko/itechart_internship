import React from "react";
import {connect} from "react-redux";
import {suFetchBookData, suHandOutBook, suCancelBook, suReturnToBookStatus} from "../actions"
import BookManage from "../components/BookManage/BookManage"

class BookManageContainer extends React.PureComponent {

  componentDidMount() {
    this.props.onSuFetchBookData(this.props.match.params.bookId)
  }

  handOutHandler = (userId) => {
    this.props.onSuHandOutBook(userId, this.props.match.params.bookId);
  }

  cancelBookHandler = (userId) => {
    this.props.onSuCancelBook(userId, this.props.match.params.bookId);
  }

  returnTobookStatus = (userId) => {
    this.props.onSuReturnToBookStatus(userId, this.props.match.params.bookId);
  }

  render() {
    return(
      <>
      <BookManage suContent={this.props.suContent} handOutHandler={this.handOutHandler} cancelBookHandler={this.cancelBookHandler} returnTobookStatus={this.returnTobookStatus}/>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    suContent: state.su.managedBook
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSuFetchBookData: (bookId) => dispatch(suFetchBookData(bookId)),
    onSuHandOutBook: (userId, bookId) => dispatch(suHandOutBook(userId, bookId)),
    onSuCancelBook: (userId, bookId) => dispatch(suCancelBook(userId, bookId)),
    onSuReturnToBookStatus: (userId, bookId) => dispatch(suReturnToBookStatus(userId, bookId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookManageContainer);
