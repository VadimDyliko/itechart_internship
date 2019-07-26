import React from "react";
import "./ModalMessage.css"
import ReactDOM from 'react-dom'

class MadalMessage extends React.PureComponent {

  render() {
    let modalMessage = this.props.isShow
      ? (<div className="modal modal_show" tabIndex="-1" role="dialog" style={{
          display: 'block'
        }}>
        <div className="modal-header">
          <h2 className="modal-title">{this.props.modalTitle}</h2>
          <p>{this.props.modalText}.</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.closeModalMessage}>
            Close
          </button>
        </div>
      </div>)
      : <div></div>
    return ReactDOM.createPortal(<> {
      modalMessage
    }</>, document.getElementById("modal"))
  }
}

export default(MadalMessage);
