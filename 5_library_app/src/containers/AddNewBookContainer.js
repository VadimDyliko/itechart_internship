import React from 'react';
import {connect} from 'react-redux'
import AddNewBook from '../components/AddNewBook/AddNewBook';
import {setModal, suAddNewBook} from '../actions'

class AddNewBookContainer extends React.Component {

  submitHandler = ( data ) => {
    if (data.title && data.year && data.bookAthour && data.bookDiscription && data.coverImage) {
      this.props.onSuAddNewBook(data)
    } else {
      this.props.onSetModal({isShow: true, modalTitle: "Book add faild", modalText: "Set valid information"});
    }
  }

  render () {
    return(
      <AddNewBook onSetModal={this.props.onSetModal} submitHandler={this.submitHandler}/>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetModal: (data) => dispatch(setModal(data)),
    onSuAddNewBook: (data) => dispatch(suAddNewBook(data))
  }
}

export default connect(null, mapDispatchToProps)(AddNewBookContainer);