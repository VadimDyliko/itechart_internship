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
      dispatch(setModal({
        isShow: true,
        modalTitle: "Autentification faild",
        modalText: "Invalid password"
      }));
      throw new Error("invalid login or password");
    } else if (res.status === 404) {
      dispatch(setModal({
        isShow: true,
        modalTitle: "Autentification faild",
        modalText: "There is not such user"
      }));
      throw new Error("there is not such user");
    }
  })
}


export const logOutUser = () => dispatch => {
  return fetch("/logout")
    .then(() => dispatch(setUser({
      _id: '',
      login: "Guest",
      email: null,
      booksOnHand: [],
    })))
}


export const fetchUser = () => dispatch => {
  fetch('/profile')
    .then(res => {
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


const setUser = data => {
  return {
    type: "SET_USER",
    data
  };
}


export const singUpUser = data => dispatch => {
  let formData = new FormData();
  formData.append("login", data.login);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("profilePicture", data.profilePicture);
  return fetch("/singup", {
      method: "POST",
      body: formData
    })
    .then(res => {
      if (res.status === 200) {
        dispatch(fetchUser())
      } else if (res.status === 401) {
        dispatch(setModal({
          isShow: true,
          modalTitle: "Registration faild",
          modalText: "User is registred with such login or email"
        }));
        throw new Error("User is registred with such login or email");
      } else {
        dispatch(setModal({
          isShow: true,
          modalTitle: "Registration faild",
          modalText: "Set valid information"
        }));
        throw new Error("Set valid information");
      }
    })
}


export const fetchBooks = filter => (dispatch, getState) => {
  if (getState().books.length > 0) {} else {
    return fetch("/books")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Books load faild");
        }
      })
      .then((books) => dispatch(setBooks(books)))
      .catch((err) => dispatch(setModal({
        isShow: true,
        modalTitle: "Something happend",
        modalText: err
      })))
  }
}


const setBooks = (books) => {
  return {
    type: "SET_BOOKS",
    books
  };
}


export const getSingleBook = (bookId) => (dispatch) => {
  fetch(`/book/${bookId}`)
    .then(res=>res.json())
    .then(data=>{
      dispatch(setSingleBook(data))
    })
}

const setSingleBook = data => {
  return {
    type: "SET_SINGLE_BOOK",
    data
  }
}

export const addComment = (commentText, bookId) => (dispatch) => {
  fetch("/addcomment", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      bookId: bookId,
      commentText
    })
  })
}


export const bookingBook = (bookId) => (dispatch) => {
  return fetch("/bookingBook", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({bookId: bookId})
  })
  .then(res=>{
    if (res.status === 200) dispatch(fetchUser())
  })
}


export const setModal = (data = {
  isShow: false,
  modalTitle: "",
  modalText: ""
}) => {
  return {
    type: "SET_MODAL",
    data
  };
}
