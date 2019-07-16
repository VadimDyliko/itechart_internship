import React from "react";
import "./Book.css";
import classnames from "classnames";

class Book extends React.PureComponent{

  state={
    picture: '',
    isLarge: false,
  }

  componentWillMount(){
    if (this.props.bookPicture){
      let base64Flag = "data:image/jpeg;base64,";
      let binary = "";
      let bytes = [].slice.call(new Uint8Array(this.props.bookPicture.data));
      bytes.forEach(b => (binary += String.fromCharCode(b)));
      let imageStr = window.btoa(binary);
      this.setState({picture: base64Flag + imageStr})
    }

  }

bookLargeHandler=(e)=>{
  this.setState({isLarge: !this.state.isLarge})
}

clickHandler=(e)=>{
  this.props.bookDetailHandler(e, this.props._id)
}

  render(){
    let bookClassNames = classnames({
      "book": !this.state.isLarge,
      "book book_large": this.state.isLarge
    });
    return (
      <div className={bookClassNames} onClick={this.clickHandler}>
        <img className="book__cover-picture" src={this.state.picture} alt="book-cover"></img>
        <div className="book__props">
            <p>{this.props.tittle}</p>
            <p>{this.props.bookAthour}</p>
        </div>
      </div>
    );
  }

};

export default Book;
