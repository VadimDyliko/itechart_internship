import React from "react";
import "./Comment.css"

class Comment extends React.PureComponent {
  render() {
    let {commentAuthor, commentText, commentAuthorId} = this.props
    return (<div className="comment">
      <img src={`/user/avatar/${commentAuthorId}`} className="comment__author-avatar" alt="avatar"/>
      <div className="comment__details">
        <p>{commentAuthor}</p>
        <p>{commentText}</p>
      </div>
    </div>);
  }
}

export default Comment;
