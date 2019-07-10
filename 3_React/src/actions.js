export const SET_CITIES = "SET_CITIES";
export const SET_ADJECTIVES = "SET_ADJECTIVES";
export const SET_LAST_GENERATED_PAIR = "SET_LAST_GENERATED_PAIR";
export const IS_BTN_ENABLE = "IS_BTN_ENABLE";
export const VALUE_OF_GENERATED_PAIRS = "VALUE_OF_GENERATED_PAIRS";
export const MAX_VALUE_GENERATED_PAIRS = "MAX_VALUE_GENERATED_PAIRS";
export const GENERATED_PAIRS = "GENERATED_PAIRS";
export const LAST_GENERATED_PAIR = "LAST_GENERATED_PAIR";

export function setCities(data) {
  return {
    type: SET_CITIES,
    data
  };
}

export function setAdjectives(data) {
  return {
    type: SET_ADJECTIVES,
    data
  };
}

export function setLastGeneratedPair(data) {
  return {
    type: LAST_GENERATED_PAIR,
    data
  };
}

export function setGeneratedPairs(data) {
  return {
    type: GENERATED_PAIRS,
    data
  };
}

export function setMaxValueGeneratedPairs(data) {
  return {
    type: MAX_VALUE_GENERATED_PAIRS,
    data
  };
}

export function setValueOfGeneratedPairs(data) {
  return {
    type: VALUE_OF_GENERATED_PAIRS,
    data
  };
}

export function setIsBtnEnable(data) {
  return {
    type: IS_BTN_ENABLE,
    data
  };
}
