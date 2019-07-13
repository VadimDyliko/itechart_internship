export const SET_USER = "  SET_USER";



export function setUser(data = {
  login: 'guest',
  email: null,
  firstName: 'Guest',
  lastName: null,
  age: null,
  booksOnHand: [],
}) {
  return {
    type: SET_USER,
    data
  };
}
