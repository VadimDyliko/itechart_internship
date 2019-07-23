import { combineReducers } from 'redux';
import user from './user';
import modalMessage from './modalMessage';
import search from './search';
import books from './books';


const rootReducer = combineReducers ({
  user,
  books,
  modalMessage,
  search
})

export default rootReducer
