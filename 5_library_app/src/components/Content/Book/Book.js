import React from "react";
import "./Book.css";

class Book extends React.PureComponent{

  state={
    picture: ''
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
  render(){
    return (
      <div className="book">
        <img className="book__cover-picture" src={this.state.picture}></img>
        <div className="book__props">
            <p>{this.props.tittle}</p>
            <p>{this.props.bookAthour}</p>
        </div>
      </div>
    );
  }

};

export default Book;
