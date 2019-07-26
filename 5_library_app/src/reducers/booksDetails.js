  import {handleActions} from 'redux-actions';

  const booksDetails = handleActions({
    SET_BOOKS_COVERS: (state, action) => ({
      ...state,
      ...action.data
    }),
  },{});


  export default booksDetails;
