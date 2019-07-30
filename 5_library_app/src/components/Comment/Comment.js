import React from "react";
import "./Comment.css"

class Comment extends React.PureComponent {

  suBtnHandler = () => {
    this.props.suBtnHandler(this.props.commentAuthorId, this.props.date)
  }

  render() {
    let {commentAuthor, commentText, commentAuthorId, date, su} = this.props
    let localDate = new Date(date).toLocaleString()
    let suBtn = su?<button className="comment__su-btn" onClick={this.suBtnHandler}>del</button>:null
    return (<div className="comment">
      <img src={`/user/avatar/${commentAuthorId}`} className="comment__author-avatar" alt="avatar"/>
      <div className="comment__details">
        <p className="comment__author">{commentAuthor}</p>
        <p className="comment__text">{commentText}</p>
        <p className="comment__date">{localDate}</p>
        {suBtn}
      </div>
    </div>);
  }
}

export default Comment;
