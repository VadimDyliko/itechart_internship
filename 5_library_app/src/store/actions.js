export const SET_TOKEN = "SET_TOKEN";
export const   SET_USER = "  SET_USER";


export function setToken(data) {
  return {
    type: SET_TOKEN,
    data
  };
}

export function setUser(data) {
  return {
    type:   SET_USER,
    data
  };
}
