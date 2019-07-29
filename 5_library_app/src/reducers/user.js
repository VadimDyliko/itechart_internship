import {handleActions} from 'redux-actions';

const user = handleActions({
  SET_USER: (state, action) => ({
    ...state,
    _id: action.data._id,
    login: action.data.login,
    email: action.data.email,
    booksOnHand: action.data.booksOnHand,
    bookingBooks: action.data.bookingBooks,
    su: action.data.su
  }),
}, {
  _id:'',
  login: "Guest",
  email: null,
  booksOnHand: [],
  bookingBooks: []
});

export default user;
