  import { handleActions } from 'redux-actions';

  const booksDetails = handleActions( {
    SET_SINGLE_BOOK: ( state, action ) => ( {
      ...state,
      ...action.data
    } ),
  }, {} );


  export default booksDetails;
