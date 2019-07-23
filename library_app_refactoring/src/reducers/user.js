import {SET_USER} from "../constants/actionTypes";

const initialState = {
  isSingIn: false,
  login: "Guest",
  email: null,
  firstName: "Guest",
  lastName: null,
  age: null,
  booksOnHand: [],
  profilePicture: undefined
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        login: action.data.login,
        email: action.data.email,
        firstName: action.data.firstName,
        lastName: action.data.lastName,
        age: action.data.age,
        booksOnHand: action.data.booksOnHand,
        profilePicture: action.data.profilePicture
      });
    default:
      return state;
  }
}

export default user;
