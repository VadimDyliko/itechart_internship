import {
  SET_TOKEN,
} from "./actions";

const initialState = {
  token: "guest"
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return Object.assign({}, state, {
        token: action.data
      });
    default:
      return state;
  }
}
