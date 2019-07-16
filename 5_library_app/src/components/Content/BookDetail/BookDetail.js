import React from 'react'
import './BookDetail.css'
import io from 'socket.io-client';
import ContentSpiner from '../ContentSpiner'
import Comments from './Comments/Comments'
import AddNewComment from './Comments/AddNewComment'
const socket = io('/')
socket.on('connect', ()=>{
  console.log('connected to socket');
})


class BookDetail extends React.PureComponent {

  state={
    showSpiner: false,
    top: 0,
    book:{
      tittle:'',
      bookAthour:'',
      year: '',
      bookDiscription:'',
      bookPicture: '',
      comments:[],
    }
  }

  componentDidMount() {
    this.setState({top: `${window.pageYOffset+100}px`, showSpiner: true})
    socket.emit('getBookById', this.props.bookDetailId)
    socket.on('getBookById', (book)=>{
      let base64Flag = "data:image/jpeg;base64,";
      let binary = "";
      let bytes = [].slice.call(new Uint8Array(book.bookPicture.data));
      bytes.forEach(b => (binary += String.fromCharCode(b)));
      let imageStr = window.btoa(binary);
      book.bookPicture = base64Flag + imageStr;
      this.setState({book:book, showSpiner: false})
    })
  }

  componentWillUnmount(){
    console.log(123);
    socket.off('getBookById')
  }

  closeclickHandler= (e)=>{
    this.props.bookDetailCloseHandler()
  }



  render () {
    let spiner = this.state.showSpiner?(<ContentSpiner/>):(<></>);
    return(
      <div className="book-detail" style={{top: this.state.top}}>
      {spiner}
      <div className="book-datail__props">
        <div className="book-detail__cover">
          <img className="book-detail__cover-image" src={this.state.book.bookPicture} alt="cover"></img>
        </div>
        <div className="book-detail__discriptions">
          <h2>{this.state.book.tittle}</h2>
          <p>{this.state.book.bookAthour}</p>
          <p>{this.state.book.bookDiscription}</p>
          <button type="button" className="btn btn-outline-primary" onClick={this.closeclickHandler}>Close</button>
        </div>
        </div>
        <AddNewComment socket={socket} bookId={this.props.bookDetailId}/>
        <Comments socket={socket} bookComments={this.state.book.comments} bookId={this.props.bookDetailId}/>
      </div>
    )
  }
}

export default BookDetail;
