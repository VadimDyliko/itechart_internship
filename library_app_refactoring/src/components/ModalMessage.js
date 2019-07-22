import React from "react";
import { connect } from "react-redux";

class MadalMessage extends React.PureComponent {

  render() {
    let modalMessage = this.props.isShow?(
      <div className="modal modal_show" tabIndex="-1" role="dialog" style={{display: 'block'}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.modalTitle}</h5>
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
              <p>{this.props.modalText}.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.props.closeModalMessage}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    ):null
    return (
      <>
        {modalMessage}
      </>
    );
  }
}

export default (MadalMessage);
