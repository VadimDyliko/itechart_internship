import { handleActions } from 'redux-actions';

const su = handleActions( {
  SET_MANAGED_BOOK: ( state, action ) => ( {
    ...state,
    ...action.data
  } ),
  SET_MANAGED_USER: ( state, action ) => ( {
    ...state,
    ...action.data
  } ),
  SET_LOG: ( state, action ) => ( {
    ...state,
    ...action.data
  } ),
}, {} );


export default su;
