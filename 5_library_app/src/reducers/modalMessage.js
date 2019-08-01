import { handleActions } from 'redux-actions';

const modalMessage = handleActions( {
  SET_MODAL: ( state, action ) => ( {
    ...state,
    isShow: action.data.isShow,
    modalTitle: action.data.modalTitle,
    modalText: action.data.modalText
  } ),
}, {
  isShow: false,
  modalTitle: "modal message title",
  modalText: "modal message text"
} );

export default modalMessage;
