import {combineReducers} from 'redux';
import user from './user';
import modalMessage from './modalMessage';
import books from './books';
import booksDetails from './booksDetails';
import su from './su';
import searchResult from './searchResult';
import manageBooks from './manageBooks';

const rootReducer = combineReducers({
  user,
  books,
  booksDetails,
  modalMessage,
  su,
  searchResult,
  manageBooks
})

export default rootReducer
