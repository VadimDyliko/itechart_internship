import { SET_CITIES, SET_ADJECTIVES } from "./actions";

const initialState = {
  adjectives: [],
  cities: []
};

function cityRandomizer(state = initialState, action) {
  switch (action.type) {
    case SET_CITIES:
      return Object.assign({}, state, {
        cities: action.data
      });
    case SET_ADJECTIVES:
      return Object.assign({}, state, {
        adjectives: action.data
      });
    default:
      return state;
  }
}

export default function cityRandomizerApp(state = {}, action) {
  return {
    cityRandomizer: cityRandomizer(state.cityRandomizer, action)
  };
}
