import React from 'react'
import './BookDetail.css'
import openSocket from 'socket.io-client';
const socket = openSocket('/')
socket.on('connect', ()=>{
  console.log('connected to socket');
})
socket.on('disconnect', ()=>{
  console.log('disconnect from socket');
})
socket.on('this', (data)=>{
  console.log(data);
})

class BookDetail extends React.PureComponent {

  state={
    top: 0
  }

  closeclickHandler= (e)=>{
    this.props.bookDetailCloseHandler()
  }

  componentDidMount() {
    console.log(window.pageYOffset);
    this.setState({top: `${window.pageYOffset+100}px`})
    socket.emit('bookid', this.props.bookDetailId)
  }

  componentWillUnmount() {
    socket.emit('disconnect')
  }


  render () {
    return(
      <div className="book-detail" style={{top: this.state.top}}>
        <div className="book-detail__cover">
          <img alt="cover"></img>
        </div>
        <div className="book-detail__discriptions">
          <p>{this.props.bookDetailId}</p>
          <button type="button" className="btn btn-outline-primary" onClick={this.closeclickHandler}>Close</button>
        </div>
      </div>
    )
  }
}

export default BookDetail;
