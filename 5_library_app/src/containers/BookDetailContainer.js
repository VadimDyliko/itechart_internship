import React from "react";
import {connect} from "react-redux";
import BookDetail from "../components/BookDetail/BookDetail"
import openSocket from 'socket.io-client';
const socket = openSocket('/');


class BookDetailContainer extends React.PureComponent {

state={
  _id: '',
  tittle: '',
  year: '',
  bookAthour: '',
  bookDiscription: '',
  comments: []
}

  componentDidMount() {
    socket.emit('reqBookData', {bookId: this.props.match.params.bookId})
    socket.on('resBookData', data=>{
      data.comments.forEach((comment, i)=>{
        //Clear comment in db and add autor id to key
        comment.id = i
      })
      this.setState(data)
    })
  }

  componentWillUnmount(nextProps, nextState) {
    socket.off('getBookData')
  }

  render() {
    return (<div>
      <BookDetail bookId={this.props.match.params.bookId} tittle={this.state.tittle} year={this.state.year} bookAthour={this.state.bookAthour} bookDiscription={this.state.bookDiscription} comments={this.state.comments} userId={this.props.userId}/>
    </div>);
  }
}

const mapStateToProps = state => {
  return {
    userId:state.user._id
  }
}

export default connect(mapStateToProps)(BookDetailContainer);
