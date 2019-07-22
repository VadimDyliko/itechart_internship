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

export const loginUser = (data) => (dispatch) => {
  console.log('login');
  return fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => {
    if (res.status === 200) {
      //ok
      console.log(200);
      dispatch(fetchUser());
    } else if (res.status === 401) {
      // dispatch(setModal({isShow: true, modalTitle: "Autentification faild", modalText: "Invalid password"}));
      // throw new Error("invalid login or password");
    } else if (res.status === 404) {
      // dispatch(setModal({isShow: true, modalTitle: "Autentification faild", modalText: "There is not such user"}));
      // throw new Error("there is not such user");
    }
  })
}


export const fetchUser = () => dispatch => {
  console.log('fetchUser');
  fetch('/profile')
    .then(res=>{
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("did not autentificated");
      }
    })
    .then(data => {
      dispatch(setUser(data));
    })
    .catch(err => {
      console.log(err);
    });
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
