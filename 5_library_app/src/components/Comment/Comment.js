import React from "react";
import "./Comment.css"

class Comment extends React.PureComponent {
  render() {
    let {commentAuthor, commentText, commentAuthorId, date} = this.props
    let localDate = new Date(date).toLocaleString()
    return (<div className="comment">
      <img src={`/user/avatar/${commentAuthorId}`} className="comment__author-avatar" alt="avatar"/>
      <div className="comment__details">
        <p className="comment__author">{commentAuthor}</p>
        <p className="comment__text">{commentText}</p>
        <p className="comment__date">{localDate}</p>
      </div>
    </div>);
  }
}

export default Comment;
