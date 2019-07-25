import React from "react";
import "./CommentAdd.css"
import personIcon from '../../png/person.png'

class CommentAdd extends React.PureComponent {

  state={
    commentText: ''
  }

  commentTextHandler = e => {
    this.setState({commentText: e.target.value})
  }

  submitHandler = e => {
    fetch("/addcomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bookId: this.props.bookId,
        commentText: this.state.commentText
      })
    })
  }

  render() {
    let {commentAuthorId} = this.props
    let authorAvatar = commentAuthorId?`/user/avatar/${commentAuthorId}`:personIcon
    return (
      <div className="comment">
        <img src={authorAvatar} className="comment__author-avatar" alt="avatar"/>
        <div className="comment__details">
          <input className="comment__comment-input" type="text"  placeholder="Enter comment" onChange={this.commentTextHandler}></input>
          <button className="btn" onClick={this.submitHandler}>Add comment</button>
        </div>
      </div>
    );
  }
}

export default CommentAdd;
