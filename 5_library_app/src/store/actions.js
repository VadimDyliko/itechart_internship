export const SET_USER = "SET_USER";
export const SET_MODAL = "SET_MODAL";
export const SET_SEARCH = "SET_SEARCH";

export function setUser(
  data = {
    login: "guest",
    email: null,
    firstName: "Guest",
    lastName: null,
    age: null,
    booksOnHand: [],
    profilePicture: {}
  }
) {
  if (data.profilePicture) {
    let base64Flag = "data:image/jpeg;base64,";
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(data.profilePicture.data));
    bytes.forEach(b => (binary += String.fromCharCode(b)));
    let imageStr = window.btoa(binary);
    data.profilePicture = base64Flag + imageStr;
  }
  return {
    type: SET_USER,
    data
  };
}

export function setModal(data) {
  return {
    type: SET_MODAL,
    data
  };
}

export function setSearch(data) {
  return {
    type: SET_SEARCH,
    data
  };
}
