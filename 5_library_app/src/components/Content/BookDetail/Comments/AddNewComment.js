import React from 'react'
import {connect} from 'react-redux'

class AddNewComment extends React.PureComponent {

  state={
    commentText: ''
  }

  inputCommenthandler = (e) => {
    this.setState({commentText: e.target.value})
  }

  submitHandler =(e) =>{
    let comment={
      commentAuthor: this.props.login,
      commentText: this.state.commentText,
      bookId: this.props.bookId
    }
    this.props.socket.emit('addNewComment', comment)
  }

  render () {
    return(
      <div className="comments__add-new-comment">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Add comment</span>
          </div>
          <textarea className="form-control" aria-label="With textarea" onChange={this.inputCommenthandler}></textarea>
        </div>
        <button type="button" className="btn btn-outline-primary" onClick={this.submitHandler}>Add comment</button>
      </div>
    )
  }
}

const putStatetoProps = state => {
  return {login: state.user.login};
};

export default connect(putStatetoProps)(AddNewComment);
