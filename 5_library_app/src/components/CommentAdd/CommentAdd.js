import React from "react";
import "./CommentAdd.css"

class CommentAdd extends React.PureComponent {

  state={
    commentText: ''
  }

  commentTextHandler = e => {
    this.setState({commentText: e.target.value})
  }

  render() {
    let {commentAuthor, commentText} = this.props
    return (
      <div className="comment">
        <img src="/user/avatar/5d2c8e221658ce17f7295ce8" className="comment__author-avatar" alt="avatar"/>
        <div className="comment__details">
          <input className="comment__comment-input" type="text"  placeholder="Enter comment" onChange={this.commentTextHandler}></input>
        </div>
      </div>
    );
  }
}

export default CommentAdd;
