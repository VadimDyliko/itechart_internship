import { handleActions } from 'redux-actions';

const books = handleActions( {
    SET_BOOKS: ( state, action ) => ( [ ...action.books ] ),
  },
  []
);

export default books;
