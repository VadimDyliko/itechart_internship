import React from "react";
import {connect} from 'react-redux';
import {setModal} from '../../store/actions'

class BookAdder extends React.PureComponent {
  state = {
    title:'',
    bookDiscription:'',
    year:'',
    bookAthour:'',
  };

  titleHandler = e => {
    this.setState({ title: e.target.value });
  };
  bookDiscriptionHandler = e => {
    this.setState({ bookDiscription: e.target.value });
  };
  yearHandler = e => {
    this.setState({ year: e.target.value });
  };
  bookAthourHandler = e => {
    this.setState({ bookAthour: e.target.value });
  };
  bookPictureHandler = e => {
    let file = e.target.files[0];
    if (file) {
      if (e.target.files[0].type.split("/")[0] === "image") {
        this.setState({
          bookPicture: file,
          bookPictureName: file ? file.name : "Choose file"
        });
      } else {
        this.props.dispatch(
          setModal({
            isShow: true,
            modalTitle: "Invalid image type",
            modalText: "Choose valid image"
          })
        );
      }
    } else {
      this.setState({
        bookPicture: null,
        bookPictureName: "Choose file"
      });
    }
  };





  submitHandler = e => {
    e.preventDefault();
      let formData = new FormData();
      formData.append("title", this.state.title);
      formData.append("bookDiscription", this.state.bookDiscription);
      formData.append("year", this.state.year);
      formData.append("bookAthour", this.state.bookAthour);
      formData.append("bookPicture", this.state.bookPicture);
      console.log(formData);
      fetch("/bookAdd", {
        method: "POST",
        body: formData
      })
}
  // tittle: String,
  // year: Number,
  // bookAthour: String,
  // bookDiscription: String,
  // bookBookedBy: String,
  // bookOnHandAt: String,
  // bookPicture: Buffer,
  // comments: Array

  render() {
    return (
      <div className="book-adder" style={{maxWidth: '800px'}}>
      <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label >title</label>
            <input type="text" className="form-control" placeholder="Enter Title" name="title" onChange={this.titleHandler}></input>
          </div>
          <div className="form-group">
            <label >bookDiscription</label>
            <input type="text" className="form-control" placeholder="Enter discription" name="bookDiscription" onChange={this.bookDiscriptionHandler}></input>
          </div>
          <div className="form-group">
            <label >year</label>
            <input type="text" className="form-control" placeholder="Enter year" name="year" onChange={this.yearHandler}></input>
          </div>
          <div className="form-group">
            <label >bookAthour</label>
            <input type="text" className="form-control" placeholder="Enter athour" name="bookAthour" onChange={this.bookAthourHandler}></input>
          </div>
          <div className="custom-file">
            <input
              onChange={this.bookPictureHandler}
              type="file"
              className="custom-file-input"
              accept=".jpg, .jpeg, .png"
            ></input>
            <label
              className="custom-file-label"
              forhtml="inputFileProfileImage"
            >
              {this.state.bookPictureName}
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>
    );
  }
}

export default connect()(BookAdder);
