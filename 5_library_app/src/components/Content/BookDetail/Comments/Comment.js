import React from 'react'

class Comment extends React.PureComponent {

  state={

  }

  componentDidMount(){
    console.log(this.props);
  }

  render () {
    return(
      <div className="comments__comment">
          <div class="media">
            <img src="..." class="align-self-start mr-3" alt="..."></img>
            <div class="media-body">
              <h5 class="mt-0">{this.props.comment.commentAuthor}</h5>
              <p>{this.props.comment.commentText}</p>
            </div>
          </div>
      </div>
    )
  }
}

export default Comment;
