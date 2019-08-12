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
      bookingBooks: [],
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


export const fetchBooks = filter => (dispatch) => {
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


export const setBooks = (books) => {
  return {
    type: "SET_BOOKS",
    books
  };
}


export const getSingleBook = (bookId) => (dispatch) => {
  fetch(`/book/${bookId}`)
    .then(res => res.json())
    .then(data => {
      dispatch(setSingleBook(data))
    })
}

export const setSingleBook = data => {
  return {
    type: "SET_SINGLE_BOOK",
    data
  }
}


export const addComment = (commentText, bookId) => dispatch => {
  fetch("/addcomment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      bookId: bookId,
      commentText
    })
  })
}


export const bookingBook = (bookId, bookingTime) => dispatch => {
  return fetch("/bookingBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bookId: bookId,
        bookingTime: bookingTime
      })
    })
    .then(res => {
      if (res.status === 200) {
        dispatch(fetchUser())
        dispatch(setModal({
          isShow: true,
          modalTitle: "Booking book",
          modalText: `Book has booked for ${bookingTime/1000/60/60} hours`
        }))
      } else {
        dispatch(setModal({
          isShow: true,
          modalTitle: "Booking book faild",
          modalText: "There are no available books or you alredy have one of it"
        }))
      }
    })
}


export const cancelBook = bookId => dispatch => {
  return fetch("/cancelBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bookId: bookId
      })
    })
    .then(res => {
      if (res.status === 200) {
        dispatch(fetchUser())
      } else {
        dispatch(setModal({
          isShow: true,
          modalTitle: "Something happend",
          modalText: ""
        }))
      }
    })
}


export const searchRequest = searchExp => dispatch => {
  return fetch('/search', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        searchExp: searchExp
      })
    })
    .then(res => res.json())
    .then(data => dispatch(setSearchResult(data)))
}


const setSearchResult = data => {
  return {
    type: "SET_SEARCH_RESULT",
    data
  };
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
