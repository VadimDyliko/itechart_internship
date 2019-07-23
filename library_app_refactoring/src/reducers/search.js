import {SET_SEARCH} from "../constants/actionTypes";

  const search = (state = '', action) => {
    switch (action.type) {
      case SET_SEARCH:
        return Object.assign({}, state, {
          search: action.data
        });
      default:
        return state;
    }
  }

export default search;
