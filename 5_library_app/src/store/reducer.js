import {
  SET_USER
} from "./actions";

const initialState = {
  user: {
    login: 'guest',
    email: null,
    firstName: 'Guest',
    lastName: null,
    age: null,
    booksOnHand: [],
    profileImage: {}
  }

};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        user: action.data
      });
    default:
      return state;
  }
}
