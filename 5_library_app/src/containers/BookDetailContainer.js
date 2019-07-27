import React, {Suspense} from "react";
import {connect} from "react-redux";
import Spiner from '../components/Spiner/Spiner';
import {addComment, getSingleBook} from '../actions'
import openSocket from 'socket.io-client';
const socket = openSocket('/');
const BookDetail = React.lazy(() => import ('../components/BookDetail/BookDetail'));

class BookDetailContainer extends React.PureComponent {

  state = {
    bookId: this.props.match.params.bookId,
    tittle: '',
    year: '',
    bookAthour: '',
    bookDiscription: '',
    comments: []
  }

  componentDidMount() {
    if (!this.props.booksDetails[this.state.bookId]) this.props.onGetSingleBook(this.state.bookId);
    socket.emit('reqBookData', {bookId: this.state.bookId});
    socket.on('resBookData', comments => {
      comments.forEach((comment, i) => {
        comment.id = i + comment.commentAuthorId + comment.date;
      })
      this.setState({comments: comments});
    })
    socket.on(`commentAddedTo${this.state.bookId}`, () => {
      socket.emit('reqBookData', {bookId: this.state.bookId});
    })
  }

  componentWillUnmount(nextProps, nextState) {
    socket.off('resBookData');
    socket.off(`commentAddedTo${this.state.bookId}`);
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
    socket.emit('addComment', {bookId: this.state.bookId})
  }

  render() {
    let {tittle, year, bookAthour, bookDiscription} = this.props.booksDetails[this.state.bookId]?this.props.booksDetails[this.state.bookId]:this.state
    return (<Suspense fallback={<Spiner/>}>
      <BookDetail bookId={this.state.bookId} tittle={tittle} year={year} bookAthour={bookAthour} bookDiscription={bookDiscription} comments={this.state.comments} userId={this.props.userId} commentAddHandler={this.commentAddHandler}/>
    </Suspense>);
  }
}

const mapStateToProps = state => {
  return {
    userLogin: state.user.login,
    userId: state.user._id,
    booksDetails: state.booksDetails
  }
}

const mapDispatchToState = dispatch => {
  return {
    onAddComment: (commentText, bookId) => dispatch(addComment(commentText, bookId)),
    onGetSingleBook: (bookId) => dispatch(getSingleBook(bookId))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(BookDetailContainer);
