import React, {Suspense} from "react";
import {connect} from "react-redux";
import Spiner from '../components/Spiner';
import {addComment, getSingleBook} from '../actions'
import openSocket from 'socket.io-client';
const socket = openSocket('/');
const BookDetail = React.lazy(() => import ('../components/BookDetail/BookDetail'));

class BookDetailContainer extends React.PureComponent {

  state = {
    _id: '',
    tittle: '',
    year: '',
    bookAthour: '',
    bookDiscription: '',
    comments: []
  }

  componentDidMount() {
    if (!this.props.booksDetails[this.props.match.params.bookId]) this.props.onGetSingleBook(this.props.match.params.bookId)
    socket.emit('reqBookData', {bookId: this.props.match.params.bookId})
    socket.on('resBookData', data => {
      data.comments.forEach((comment, i) => {
        comment.id = i + comment.commentAuthorId + comment.date;
      })
      this.setState(data)
    })
    socket.on(`commentAddedTo${this.props.match.params.bookId}`, () => {
      socket.emit('reqBookData', {bookId: this.props.match.params.bookId})
    })
  }

  componentWillUnmount(nextProps, nextState) {
    socket.off('getBookData')
    socket.off(`commentAddedTo${this.props.match.params.bookId}`)
  }

  commentAddHandler = commentText => {
    this.props.onAddComment(commentText, this.props.match.params.bookId)
    socket.emit('addComment', {bookId: this.props.match.params.bookId})
  }

  render() {
    return (<Suspense fallback={<Spiner/>}>
      <BookDetail bookId={this.props.match.params.bookId} tittle={this.state.tittle} year={this.state.year} bookAthour={this.state.bookAthour} bookDiscription={this.state.bookDiscription} comments={this.state.comments} userId={this.props.userId} commentAddHandler={this.commentAddHandler}/>
    </Suspense>);
  }
}

const mapStateToProps = state => {
  return {
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
