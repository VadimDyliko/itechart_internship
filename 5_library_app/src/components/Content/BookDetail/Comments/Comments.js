import React from 'react'
import './Comments.css'
import Comment from './Comment'
class Comments extends React.PureComponent {

  state={
    comments: []
  }



  componentDidMount(){
    //realizovaty coments v steit
    //this.setState({comments: this.props.bookComments})

    this.props.socket.on('addNewComment', (bookId)=>{
      console.log(bookId);
    })
  }

  componentWillUnmount(){
    this.props.socket.off('addNewComment')
  }

  render () {
    return(

      <div className="book-comments">
        {
          this.props.bookComments.map((comment, i)=>{
            return <Comment comment={comment} key={i}/>
          })
        }
      </div>
    )
  }
}

export default Comments;
