import base64 from "base64-arraybuffer";


const validateUserData = (
  data = {
    login: "Guest",
    email: null,
    firstName: "Guest",
    lastName: null,
    age: null,
    booksOnHand: [],
    profilePicture: undefined
  }
) => dispatch => {
  if (data.profilePicture) {
    data.profilePicture = pictureToBase64(data.profilePicture)
  }
  dispatch(setUser(data))
}


const setUser = data => {
  return {
    type: "SET_USER",
    data
  };
}


const pictureToBase64 = (picture) => {
  return ("data:image/jpeg;base64," + base64.encode(picture.data))
}


export const loginUser = (data) => (dispatch) => {
  return fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => {
    if (res.status === 200) {
      dispatch(fetchUser());
    } else if (res.status === 401) {
      dispatch(setModal({isShow: true, modalTitle: "Autentification faild", modalText: "Invalid password"}));
      throw new Error("invalid login or password");
    } else if (res.status === 404) {
      dispatch(setModal({isShow: true, modalTitle: "Autentification faild", modalText: "There is not such user"}));
      throw new Error("there is not such user");
    }
  })
}


export const logOutUser = () => dispatch => {
  return fetch("/logout")
  .then(()=>dispatch(validateUserData()))
}


export const fetchUser = () => dispatch => {
  fetch('/profile')
    .then(res=>{
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("did not autentificated");
      }
    })
    .then(data => {
      dispatch(validateUserData(data));
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
      dispatch(fetchUser())
    } else if (res.status === 401) {
      dispatch(setModal({isShow: true, modalTitle: "Registration faild", modalText: "User is registred with such login or email"}));
      throw new Error("User is registred with such login or email");
    } else {
      dispatch(setModal({isShow: true, modalTitle: "Registration faild", modalText: "Set valid information"}));
      throw new Error("Set valid information");
    }
  })
}


export const fetchBooks = filter => (dispatch, getState) => {
  if (getState().books.length>0) {
    return Promise.resolve()
  } else {
    return fetch("/books")
      .then((res)=>{
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Books load faild");
        }
      })
      .then((books)=>dispatch(setBooks(books)))
      .catch((err)=>dispatch(setModal({isShow: true, modalTitle: "Something happend", modalText: err})))
  }
}


export const fetchBookCover = bookId => (dispatch, getState) => {
  let bookById = getState().booksDetails[bookId]
  if (bookById) return Promise.resolve(bookById.cover)
  return fetch(`/books/cover/${bookId}`)
  .then((res)=>res.json())
  .then((cover)=>{
    return Object.assign({}, cover, {bookPicture: pictureToBase64(cover.bookPicture)})
  })
  .then((cover)=>{
    dispatch(setCoverToStore(cover._id, cover.bookPicture))
    return cover
  })
  .then((cover)=>cover.bookPicture)
  .catch((err)=>dispatch(setModal({isShow: true, modalTitle: "Something happend", modalText: err})))
}


const setCoverToStore = (id, cover) => {
 return {
   type: "SET_BOOKS_COVERS",
   data:{
     [id]:{
       cover
     }
   }
 }
}


const setBooks = (books) =>{
  return {
    type: "SET_BOOKS",
    books
  };
}


export const setModal = (data = {isShow: false, modalTitle: "", modalText: ""}) => {
  return {
    type: "SET_MODAL",
    data
  };
}
