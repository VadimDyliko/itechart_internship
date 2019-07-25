import {handleActions} from 'redux-actions';

const user = handleActions({
  SET_USER: (state, action) => ({
    ...state,
    login: action.data.login,
    email: action.data.email,
    firstName: action.data.firstName,
    lastName: action.data.lastName,
    age: action.data.age,
    booksOnHand: action.data.booksOnHand,
    profilePicture: action.data.profilePicture
  }),
}, {
  isSingIn: false,
  login: "Guest",
  email: null,
  firstName: "Guest",
  lastName: null,
  age: null,
  booksOnHand: [],
  profilePicture: undefined
});

export default user;
