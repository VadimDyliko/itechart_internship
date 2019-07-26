import React from "react";
import "./BookDetail.css"
import Comment from '../Comment/Comment'
import CommentAdd from '../CommentAdd/CommentAdd'

class BookDetail extends React.PureComponent {
  render() {
    let {
      tittle,
      year,
      bookAthour,
      bookDiscription,
      comments,
      commentAddHandler,
      userId,
      bookId
    } = this.props
    return (<div className="book-detail">
      <div className="book-detail__about">
        <img className="book-detail__cover-image" src={`/book/cover/${this.props.bookId}`} alt="cover"/>
        <div className="book-detail__details">
          <h2>{tittle}</h2>
          <p>{bookAthour}{year}</p>
          <p className="book-detail__discription-text">{bookDiscription}</p>
        </div>
      </div>
      <div>
        {
          comments.map(comment => {
            return (<Comment key={comment.id} commentAuthor={comment.commentAuthor} commentAuthorId={comment.commentAuthorId} commentText={comment.commentText}/>)
          })
        }
        <CommentAdd bookId={bookId} commentAuthorId={userId} commentAddHandler={commentAddHandler}/>
      </div>
    </div>);
  }
}

export default BookDetail;
