import React from 'react';
import './Book.css';

//FIXME
import {connect} from 'react-redux';
import {fetchBookCover} from '../../actions';

class Book extends React.PureComponent {

  //FIXME

  state={
    bookCover: ''
  }

  componentDidMount() {
    this.props.dispatch(fetchBookCover(this.props.book._id))
    .then((cover)=>{
      this.setState({bookCover: cover})
    })
  }


  clickHandler = () => {
    this.props.bookClickHandler(this.props.book._id)
  }

  render () {
    let {bookPicture} =this.props.book
    let cover = this.state.bookCover?<img src={this.state.bookCover} className="book__cover-image" alt="cover"/>:<p>Loading cover ...</p>
    return(
      <div className="book" onClick={this.clickHandler}>
        {cover}
      </div>
    )
  }
}

export default connect()(Book);
