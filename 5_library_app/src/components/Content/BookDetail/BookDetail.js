import React from 'react'
import './BookDetail.css'

class BookDetail extends React.PureComponent {

  state={
    top: 0
  }

  closeclickHandler= (e)=>{
    this.props.bookDetailCloseHandler()
  }

  componentDidMount() {
    console.log(window.pageYOffset);
    this.setState({top: `${window.pageYOffset+100}px`})
  }

  render () {
    return(
      <div className="book-detail" style={{top: this.state.top}}>
        <div className="book-detail__cover">
          <img alt="cover"></img>
        </div>
        <div className="book-detail__discriptions">
          <p>{this.props.bookDetailId}</p>
          <button type="button" className="btn btn-outline-primary" onClick={this.closeclickHandler}>Close</button>
        </div>
      </div>
    )
  }
}

export default BookDetail;
