import {handleActions} from 'redux-actions';

const manageBooks = handleActions({
    SET_BOOKS_FOR_MANAGE: (state, action) => ([...action.data]),
  },
  []
);

export default manageBooks;
