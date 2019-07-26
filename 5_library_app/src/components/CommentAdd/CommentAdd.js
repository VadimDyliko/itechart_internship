import React from "react";
import "./CommentAdd.css"
import personIcon from '../../png/person.png'

class CommentAdd extends React.PureComponent {

  state = {
    commentText: ''
  }

  commentTextHandler = e => {
    this.setState({commentText: e.target.value})
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.commentAddHandler(this.state.commentText)
  }

  render() {
    let {commentAuthorId} = this.props
    let authorAvatar = commentAuthorId
      ? `/user/avatar/${commentAuthorId}`
      : personIcon
    return (<form className="comment-add" onSubmit={this.submitHandler}>
      <img src={authorAvatar} className="comment__author-avatar" alt="avatar"/>
      <div className="comment-input__details">
        <input className="comment__comment-input" type="text" placeholder="Enter comment" onChange={this.commentTextHandler}></input>
        <button type="submit" className="btn comment-add__button">Add comment</button>
      </div>
    </form>);
  }
}

export default CommentAdd;
