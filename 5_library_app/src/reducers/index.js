import {combineReducers} from 'redux';
import user from './user';
import modalMessage from './modalMessage';
import books from './books';
import booksDetails from './booksDetails';
import su from './su';

const rootReducer = combineReducers({
  user,
  books,
  booksDetails,
  modalMessage,
  su
})

export default rootReducer
