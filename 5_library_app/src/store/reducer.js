import { SET_USER, SET_MODAL } from "./actions";

const initialState = {
  user: {
    login: "guest",
    email: null,
    firstName: "Guest",
    lastName: null,
    age: null,
    booksOnHand: [],
    profileImage: {}
  },
  modalMessage: {
    isShow: false,
    modalTitle: "Title",
    modalText: "Text"
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        user: action.data
      });
    case SET_MODAL:
      return Object.assign({}, state, {
        modalMessage: action.data
      });
    default:
      return state;
  }
}
