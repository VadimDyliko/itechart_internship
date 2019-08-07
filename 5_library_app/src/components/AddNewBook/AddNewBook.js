import React from 'react';
import './AddNewBook.css'

class AddNewBook extends React.PureComponent {

  state = {
    title: '',
    year: '',
    bookAthour: '',
    bookDiscription: '',
    coverImage: ''
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.submitHandler(this.state);
  }

  inputHandler = e => {
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  coverImageHandler = e => {
    let file = e.target.files[0];
    if (file) {
      if (e.target.files[0].type.split("/")[0] === "image") {
        this.setState({
          coverImage: file,
          coverImageName: file ?
            file.name :
            "Choose file"
        });
      } else {
        this.props.onSetModal({ isShow: true, modalTitle: "Invalid image type", modalText: "Choose valid image" });
      }
    } else {
      this.setState({ profilePicture: null, profilePictureName: "Choose file" });
    }
  }

  render() {
    return (<div className="add-new-book">
      <form onSubmit={this.submitHandler} className="add-new-book__form">
        <p>title</p>
        <input type="text" className="add-new-book form-control" name="title" onChange={this.inputHandler}/>
        <p>year</p>
        <input type="text" className="add-new-book form-control" name="year" onChange={this.inputHandler}/>
        <p>bookAthour</p>
        <input type="text" className="add-new-book form-control" name="bookAthour" onChange={this.inputHandler}/>
        <p>bookDiscription</p>
        <input type="text" className="add-new-book form-control" name="bookDiscription" onChange={this.inputHandler}/>
        <p>coverImage</p>
        <input onChange={this.coverImageHandler} type="file" className="custom-file-input" id="inputFileCoverImage" accept=".jpg, .jpeg, .png"></input>
        <button type="submit" className="btn">Add new book</button>
      </form>
    </div>)
  }
}

export default AddNewBook;
