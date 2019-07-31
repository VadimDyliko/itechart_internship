import React from 'react'
import "./BookManage.css"
import BookManageBookedItem from "../BookManageItem/BookManageBookedItem"
import BookManageOnhandItem from "../BookManageItem/BookManageOnhandItem"

class BookManage extends React.PureComponent {
  render () {
    return(
      <div className="book-manage">
          <button className="book-manage_btn btn" onClick={this.props.goBack}>Go Back</button>
          <div className="book-manage__lists">
              <div className="book-manage__list">
                <p>Booked by:</p>
                {this.props.suContent?this.props.suContent.bookBookedBy.map((book,i)=>{
                        return <BookManageBookedItem key={i + book.userId + book.dateOfBook} book={book} handOutHandler={this.props.handOutHandler} cancelBookHandler={this.props.cancelBookHandler}/>
                      }):null}
              </div>
              <div className="book-manage__list">
                <p>On hands at:</p>
                {this.props.suContent?this.props.suContent.bookOnHandAt.map((book,i)=>{
                        return <BookManageOnhandItem key={i + book.userId + book.dateOfBook} book={book} returnTobookStatus={this.props.returnTobookStatus}/>
                      }):null}
              </div>
          </div>
      </div>
    )
  }
}

export default BookManage;
