import {SET_BOOKS} from "../constants/actionTypes";

  const search = (state = [], action) => {
    switch (action.type) {
      case SET_BOOKS:
        return [...action.books]
      default:
        return state;
    }
  }

export default search;
