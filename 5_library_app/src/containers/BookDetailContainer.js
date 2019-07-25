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
      this.setState(data)
    })
  }

  componentWillUnmount(nextProps, nextState) {
    socket.off('getBookData')
  }

  render() {
    return (<div>
      <BookDetail bookId={this.props.match.params.bookId} tittle={this.state.tittle} year={this.state.year} bookAthour={this.state.bookAthour} bookDiscription={this.state.bookDiscription} comments={this.state.comments}/>
    </div>);
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default connect()(BookDetailContainer);
