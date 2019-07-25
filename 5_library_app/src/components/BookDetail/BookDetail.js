import React from "react";
import "./BookDetail.css"
import Comment from '../Comment/Comment'
import CommentAdd from '../CommentAdd/CommentAdd'

class BookDetailContainer extends React.PureComponent {
  render() {
    let {tittle, year, bookAthour, bookDiscription, comments} = this.props
    let coverImgUrl = `/book/cover/${this.props.bookId}`
    return (<div className="book-detail">
      <img className="book-detail__cover-image" src={coverImgUrl} alt="cover"/>
      <p>{tittle}</p>
      <p>{year}</p>
      <p>{bookAthour}</p>
      <p>{bookDiscription}</p>
      {
        comments.map(comment=>{
          return (
            <Comment key={comment.id} commentAuthor={comment.commentAuthor} commentAuthorId={comment.commentAuthorId} commentText={comment.commentText}/>
          )
        })
      }
      <CommentAdd bookId={this.props.bookId} commentAuthorId={this.props.userId}/>
    </div>);
  }
}

export default BookDetailContainer;
