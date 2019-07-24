import { combineReducers } from 'redux';
import user from './user';
import modalMessage from './modalMessage';
import search from './search';
import books from './books';
import booksDetails from './booksDetails';



const rootReducer = combineReducers ({
  user,
  books,
  booksDetails,
  modalMessage,
  search
})

export default rootReducer
