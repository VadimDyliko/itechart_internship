import React from "react";
import {connect} from "react-redux";
import {suFetchBookData, suHandOutBook, suCancelBook, suReturnToBookStatus} from "../actions/su"
import BookManage from "../components/BookManage/BookManage"
import Spiner from '../components/Spiner/Spiner'

class BookManageContainer extends React.PureComponent {

    state={
      showSpiner: true
    }

  componentDidMount() {
    this.props.onSuFetchBookData(this.props.match.params.bookId)
      .then(()=>this.setState({showSpiner:false}))
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

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    let content = this.state.showSpiner?<Spiner/>:<BookManage suContent={this.props.suContent} handOutHandler={this.handOutHandler} cancelBookHandler={this.cancelBookHandler} returnTobookStatus={this.returnTobookStatus} goBack={this.goBack}/>
    return(
      <>
        {content}
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
