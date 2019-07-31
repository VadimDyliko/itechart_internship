import React, {Suspense} from "react";
import {connect} from "react-redux";
import Spiner from '../components/Spiner/Spiner';
import {addComment, getSingleBook, bookingBook} from '../actions'
import {suDeleteComment} from '../actions/su'
import openSocket from 'socket.io-client';
const socket = openSocket('/');
const BookDetail = React.lazy(() => import ('../components/BookDetail/BookDetail'));

class BookDetailContainer extends React.PureComponent {

  state = {
    bookId: this.props.match.params.bookId,
    title: '',
    year: '',
    bookAthour: '',
    bookDiscription: '',
    comments: [],
    count: 0,
    availableCount: 0
  }

  componentDidMount() {
    if (!this.props.booksDetails[this.state.bookId]) this.props.onGetSingleBook(this.state.bookId);
    socket.emit('reqBookData', {bookId: this.state.bookId});
    socket.on('resBookData', data => {
      let comments = data.comments.map((comment, i) => {
        comment.id = i + comment.commentAuthorId + comment.date;
        return comment;
      })
      this.setState({comments: comments, count: data.count, availableCount: data.availableCount});
    })
    socket.on(`dataUpdate${this.state.bookId}`, () => {
      socket.emit('reqBookData', {bookId: this.state.bookId});
    })
  }

  componentWillUnmount(nextProps, nextState) {
    socket.off('resBookData');
    socket.off(`dataUpdate${this.state.bookId}`);
  }

  commentAddHandler = commentText => {
    let newComment = {
      commentAuthorId: this.props.userId,
      commentAuthor: this.props.userLogin,
      commentText: commentText,
      date: Date.now(),
      id: this.state.comments.length + 2 + this.commentAuthorId + this.date
    }
    this.setState((prevState)=>({comments: [...prevState.comments, newComment]}))
    this.props.onAddComment(commentText, this.state.bookId)
  }


  bookingHandler = e => {
    this.props.onBookingBook(this.state.bookId)
  }


  suBtnHandler = (commentAuthorId, date) => {
    let commentId = commentAuthorId + date;
    this.props.onSuDeleteComment(this.state.bookId, commentId);
  }


    goBack = () => {
      this.props.history.goBack()
    }

  render() {
    let {title, year, bookAthour, bookDiscription} = this.props.booksDetails[this.state.bookId]?this.props.booksDetails[this.state.bookId]:this.state
    return (<Suspense fallback={<Spiner/>}>
      <BookDetail bookId={this.state.bookId} title={title} year={year} bookAthour={bookAthour} bookDiscription={bookDiscription} comments={this.state.comments} userId={this.props.userId} su={this.props.su} commentAddHandler={this.commentAddHandler} count={this.state.count} availableCount={this.state.availableCount} bookingHandler={this.bookingHandler} suBtnHandler={this.suBtnHandler} goBack={this.goBack}/>
    </Suspense>);
  }
}

const mapStateToProps = state => {
  return {
    userLogin: state.user.login,
    userId: state.user._id,
    su: state.user.su,
    booksDetails: state.booksDetails
  }
}

const mapDispatchToState = dispatch => {
  return {
    onAddComment: (commentText, bookId) => dispatch(addComment(commentText, bookId)),
    onGetSingleBook: (bookId) => dispatch(getSingleBook(bookId)),
    onBookingBook: (bookId) => dispatch(bookingBook(bookId)),
    onSuDeleteComment: (bookId, commentId) => dispatch(suDeleteComment(bookId, commentId))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(BookDetailContainer);
