import { SET_MODAL } from "../constants/actionTypes";

const initialState = {
    isShow: false,
    modalTitle: "modal message title",
    modalText: "modal message text"
  }

  const modalMessage = (state = initialState, action) => {
    switch (action.type) {
      case SET_MODAL:
        console.log(action.data);
        return Object.assign({}, state, {
          isShow: action.data.isShow,
          modalTitle: action.data.modalTitle,
          modalText: action.data.modalText
        });
      default:
        return state;
    }
  }

export default modalMessage;
