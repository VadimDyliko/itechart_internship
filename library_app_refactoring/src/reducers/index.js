import { combineReducers } from 'redux';
import user from './user';
import modalMessage from './modalMessage';
import search from './search';
import books from './books';
import bookCovers from './bookCovers';



const rootReducer = combineReducers ({
  user,
  books,
  bookCovers,
  modalMessage,
  search
})

export default rootReducer
