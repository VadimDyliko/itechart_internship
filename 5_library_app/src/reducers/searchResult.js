import { handleActions } from 'redux-actions';

const searchResult = handleActions( {
    SET_SEARCH_RESULT: ( state, action ) => ( [ ...action.data ] ),
  },
  []
);

export default searchResult;
