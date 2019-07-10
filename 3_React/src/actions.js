export const SET_CITIES = "SET_CITIES";
export const SET_ADJECTIVES = "SET_ADJECTIVES";

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
