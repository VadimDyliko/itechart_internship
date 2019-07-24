//import {SET_BOOKS} from "../constants/actionTypes";
import { handleActions } from 'redux-actions';

  // const books = (state = [], action) => {
  //   switch (action.type) {
  //     case SET_BOOKS:
  //
  //     //FIXME
  //
  //       return [...action.books]
  //     default:
  //       return state;
  //   }
  // }

  const books = handleActions({
      SET_BOOKS: (state, action) => ([...action.books]),
    },
    []
  );

export default books;
