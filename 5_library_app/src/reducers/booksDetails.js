import {SET_BOOKS_COVERS} from "../constants/actionTypes";

  const booksDetails = (state = {}, action) => {
    switch (action.type) {
      case SET_BOOKS_COVERS:
        return {...state, ...action.data}
      default:
        return state;
    }
  }

export default booksDetails;
