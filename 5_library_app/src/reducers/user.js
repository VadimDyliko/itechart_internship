import {handleActions} from 'redux-actions';

const user = handleActions({
  SET_USER: (state, action) => ({
    ...state,
    _id: action.data._id,
    login: action.data.login,
    email: action.data.email,
    firstName: action.data.firstName,
    lastName: action.data.lastName,
    age: action.data.age,
    booksOnHand: action.data.booksOnHand,
  }),
}, {
  _id:'',
  login: "Guest",
  email: null,
  firstName: "Guest",
  lastName: null,
  age: null,
  booksOnHand: [],
});

export default user;
