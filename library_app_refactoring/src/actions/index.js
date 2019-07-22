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
    data.profilePicture = pictureToBase64(data.profilePicture)
  }
  return {
    type: SET_USER,
    data
  };
}

const pictureToBase64 = picture =>{
  let base64Flag = "data:image/jpeg;base64,";
  let binary = "";
  let bytes = [].slice.call(new Uint8Array(picture.data));
  bytes.forEach(b => (binary += String.fromCharCode(b)));
  let imageStr = window.btoa(binary);
  return (base64Flag + imageStr);
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
      dispatch(setModal({isShow: true, modalTitle: "Autentification faild", modalText: "Invalid password"}));
      //throw new Error("invalid login or password");
    } else if (res.status === 404) {
      dispatch(setModal({isShow: true, modalTitle: "Autentification faild", modalText: "There is not such user"}));
      //throw new Error("there is not such user");
    }
  })
}

export const logOutUser = () => dispatch => {
  fetch("/logout")
  .then(()=>dispatch(setUser()))
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


export const singUpUser = data => dispatch =>{
  let formData = new FormData();
  formData.append("login", data.login);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("profilePicture", data.profilePicture);
  console.log(formData);
  return fetch("/singup", {
    method: "POST",
    body: formData
  })
  .then(res => {
    if (res.status === 200) {
      //ok
      dispatch(fetchUser())
    } else if (res.status === 401) {
      dispatch(setModal({isShow: true, modalTitle: "Registration faild", modalText: "User is registred with such login or email"}));
      // throw new Error("User is registred with such login or email");
    } else {
      dispatch(setModal({isShow: true, modalTitle: "Registration faild", modalText: "Set valid information"}));
      // throw new Error("Set valid information");
    }
  })
}


export const setModal = (data) => {
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
