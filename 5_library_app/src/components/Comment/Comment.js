import React from "react";
import "./Comment.css"

class Comment extends React.PureComponent {
  render() {
    let {commentAuthor, commentText} = this.props
    return (
      <div className="comment">
        <img src="/user/avatar/5d2c8e221658ce17f7295ce8" className="comment__author-avatar" alt="avatar"/>
        <div className="comment__details">
          <p>{commentAuthor}</p>
          <p>{commentText}</p>
        </div>
      </div>
    );
  }
}

export default Comment;
