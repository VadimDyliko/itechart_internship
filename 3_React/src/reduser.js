import {
  SET_CITIES,
  SET_ADJECTIVES,
  SET_LAST_GENERATED_PAIR,
  IS_BTN_ENABLE,
  VALUE_OF_GENERATED_PAIRS,
  MAX_VALUE_GENERATED_PAIRS,
  GENERATED_PAIRS,
  LAST_GENERATED_PAIR
} from "./actions";

const initialState = {
  adjectives: [],
  cities: [],
  lastGeneratedPair: "none",
  generatedPairs: [],
  maxValueGeneratedPairs: 0,
  valueOfGeneratedPairs: 0,
  isBtnEnable: true
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
    case SET_LAST_GENERATED_PAIR:
      return Object.assign({}, state, {
        lastGeneratedPair: action.data
      });
    case IS_BTN_ENABLE:
      return Object.assign({}, state, {
        isBtnEnable: action.data
      });
    case VALUE_OF_GENERATED_PAIRS:
      return Object.assign({}, state, {
        valueOfGeneratedPairs: action.data
      });
    case MAX_VALUE_GENERATED_PAIRS:
      return Object.assign({}, state, {
        maxValueGeneratedPairs: action.data
      });
    case GENERATED_PAIRS:
      return Object.assign({}, state, {
        generatedPairs: action.data
      });
    case LAST_GENERATED_PAIR:
      return Object.assign({}, state, {
        lastGeneratedPair: action.data
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
