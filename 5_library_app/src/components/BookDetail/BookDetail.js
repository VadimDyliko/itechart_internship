import React from "react";
import "./BookDetail.css";
import Comment from '../Comment/Comment';
import CommentAdd from '../CommentAdd/CommentAdd';
import {Link} from "react-router-dom";

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
      bookId,
      count,
      availableCount,
      su
    } = this.props
    let suContent = su?(
      <div>
        <Link to={`/book/${bookId}/manage`} className="navigation-link">
          Manage this book
        </Link>
      </div>
    ):null
    return (<div className="book-detail">
      <div className="book-detail__about">
        <img className="book-detail__cover-image" src={`/book/cover/${this.props.bookId}`} alt="cover"/>
        <div className="book-detail__details">
          <h2>{tittle}</h2>
          <p>{bookAthour} {year}</p>
          <p>{availableCount}/{count}</p>
          <button className="btn" onClick={this.props.bookingHandler}>Book</button>
          <p className="book-detail__discription-text">{bookDiscription}</p>
        </div>
      </div>
      {suContent}
      <div>
        {
          comments.map(comment => {
            return (<Comment key={comment.id} commentAuthor={comment.commentAuthor} commentAuthorId={comment.commentAuthorId} commentText={comment.commentText} date={comment.date}/>)
          })
        }
        <CommentAdd bookId={bookId} commentAuthorId={userId} commentAddHandler={commentAddHandler}/>
      </div>
    </div>);
  }
}

export default BookDetail;
