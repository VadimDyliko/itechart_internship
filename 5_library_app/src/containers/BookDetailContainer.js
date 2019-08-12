import React from "react";
import { connect } from "react-redux";
import BookDetail from '../components/BookDetail/BookDetail';
import Spiner from '../components/Spiner/Spiner';
import { addComment, getSingleBook, bookingBook, setModal } from '../actions'
import { suDeleteComment } from '../actions/su'
import openSocket from 'socket.io-client';
const socket = openSocket('/');


class BookDetailContainer extends React.PureComponent {

    state = {
      bookId: this.props.match.params.bookId,
      title: '',
      year: '',
      bookAthour: '',
      bookDiscription: '',
      comments: [],
      count: 0,
      availableCount: 0,
      bookingTime: 1000 * 60 * 60 * 48,
      showSpiner: true,
      haveUserThisBook: false
    }

    componentDidMount() {
      if (!this.props.booksDetails[this.state.bookId])
        this.props.onGetSingleBook(this.state.bookId);
      socket.emit('reqBookData', { bookId: this.state.bookId });
      socket.on('resBookData', data => {
        let comments = data.comments.map((comment, i) => {
          comment.id = i + comment.commentAuthorId + comment.date;
          return comment;
        })
        this.setState({ comments: comments, count: data.count, availableCount: data.availableCount, showSpiner: false });
      })
      socket.on(`dataUpdate${this.state.bookId}`, () => {
        socket.emit('reqBookData', { bookId: this.state.bookId });
      })
    }

    componentWillUnmount(nextProps, nextState) {
      socket.off('resBookData');
      socket.off(`dataUpdate${this.state.bookId}`);
    }

    componentDidUpdate(prevProps, prevState) {
      let userBooks = [...this.props.bookingBooks, ...this.props.booksOnHand]
      let compainBook = userBooks.filter(book => {
        if (book.bookId === this.state.bookId) return true
        return false
      })
      console.log(compainBook);
      if (compainBook.length > 0) {
        this.setState({ haveUserThisBook: true })
      }
    }

    banCheck = () => {
      if (this.props.isBan) {
        this.props.onSetModal({ isShow: true, modalTitle: "Faild", modalText: "Your accaunt has been baned" })
        return true
      }
      return false
    }

    commentAddHandler = commentText => {
      if (this.banCheck() || !commentText) return
      let newComment = {
        commentAuthorId: this.props.userId,
        commentAuthor: this.props.userLogin,
        commentText: commentText,
        date: Date.now(),
        id: this.state.comments.length + 2 + this.commentAuthorId + this.date
      }
      this.setState((prevState) => ({
        comments: [
          ...prevState.comments,
          newComment
        ]
      }))
      this.props.onAddComment(commentText, this.state.bookId)
    }

    bookingHandler = e => {
      if (!this.props.userId) {
        this.props.history.push('/login')
        return
      }
      if (this.banCheck()) return
      this.props.onBookingBook(this.state.bookId, this.state.bookingTime)
        .then(this.setState({ haveUserThisBook: true }))
    }

    bookingTimeHandler = bookingTime => {
      this.setState({ bookingTime })
    }

    suBtnHandler = (commentAuthorId, date) => {
      let commentId = commentAuthorId + date;
      this.props.onSuDeleteComment(this.state.bookId, commentId);
    }

    goBack = () => {
      this.props.history.goBack()
    }

    render() {
      let { title, year, bookAthour, bookDiscription } = this.props.booksDetails[this.state.bookId] ?
        this.props.booksDetails[this.state.bookId] :
        this.state
      let content = this.state.showSpiner ?
        <Spiner/> :
        <BookDetail bookId={this.state.bookId} title={title} year={year} bookAthour={bookAthour} bookDiscription={bookDiscription} comments={this.state.comments} userId={this.props.userId} su={this.props.su} commentAddHandler={this.commentAddHandler} count={this.state.count} availableCount={this.state.availableCount} bookingHandler={this.bookingHandler} suBtnHandler={this.suBtnHandler} goBack={this.goBack} bookingTimeHandler={this.bookingTimeHandler} haveUserThisBook={this.state.haveUserThisBook}/>
      return ( < > { content } < />);
      }
    }

    const mapStateToProps = state => {
      return {
        userLogin: state.user.login,
        userId: state.user._id,
        su: state.user.su,
        isBan: state.user.isBan,
        booksOnHand: state.user.booksOnHand,
        bookingBooks: state.user.bookingBooks,
        booksDetails: state.booksDetails
      }
    }

    const mapDispatchToState = dispatch => {
      return {
        onAddComment: (commentText, bookId) => dispatch(addComment(commentText, bookId)),
        onGetSingleBook: (bookId) => dispatch(getSingleBook(bookId)),
        onBookingBook: (bookId, bookingTime) => dispatch(bookingBook(bookId, bookingTime)),
        onSuDeleteComment: (bookId, commentId) => dispatch(suDeleteComment(bookId, commentId)),
        onSetModal: (data) => dispatch(setModal(data))
      }
    }

    export default connect(mapStateToProps, mapDispatchToState)(BookDetailContainer);
