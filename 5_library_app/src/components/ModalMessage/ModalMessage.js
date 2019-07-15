import React from "react";
import "./ModalMessage.css";
import { setModal } from "../../store/actions";
import { connect } from "react-redux";

class MadalMessage extends React.Component {
  componentDidMount() {
    if (this.props.modalTitle) this.setState({ title: this.props.modalTitle });
    if (this.props.modalText) this.setState({ text: this.props.modalText });
  }

  closeHandler = () => {
    this.props.dispatch(setModal({ isShow: false }));
  };

  state = {
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"
  };
  render() {
    return (
      <div className="modal modal_show" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.state.title}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{this.state.text}.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.closeHandler}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(MadalMessage);
