import {
  SET_TOKEN,
  SET_USER
} from "./actions";

const initialState = {
  token: localStorage.getItem('token')||null,
  user: {
    login: 'guest',
    email: null,
    password: null,
    firstName: 'Guest',
    lastName: null,
    age: null,
    booksOnHand:[],
  }

};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return Object.assign({}, state, {
        token: action.data
      });
    case SET_USER:
      return Object.assign({}, state, {
        user: action.data
      });
    default:
      return state;
  }
}
