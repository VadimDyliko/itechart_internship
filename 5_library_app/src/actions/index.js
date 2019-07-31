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
    .then(res => res.json())
    .then(data => {
      dispatch(setSingleBook(data))
    })
}

const setSingleBook = data => {
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


export const bookingBook = bookId => dispatch => {
  return fetch("/bookingBook", {
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


export const suFetchBookData = bookId => dispatch => {
  return fetch(`/su/fetchBookData/${bookId}`)
    .then(res => res.json())
    .then(data => dispatch(setManagedBook(data)))
}


const setManagedBook = data => {
  return {
    type: "SET_MANAGED_BOOK",
    data
  }
}


export const suHandOutBook = (userId, bookId) => dispatch => {
  return fetch('/su/handout', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        bookId: bookId
      })
    })
    .then(res => {
      if (res.status === 200) {
        dispatch(suFetchBookData(bookId))
      } else {
        dispatch(setModal({
          isShow: true,
          modalTitle: "Something happend",
          modalText: ""
        }))
      }
    })
}


export const suCancelBook = (userId, bookId) => dispatch => {
  return fetch('/su/cancelBook', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        bookId: bookId
      })
    })
    .then(res => {
      if (res.status === 200) {
        dispatch(suFetchBookData(bookId))
      } else {
        dispatch(setModal({
          isShow: true,
          modalTitle: "Something happend",
          modalText: ""
        }))
      }
    })
}


export const suReturnToBookStatus = (userId, bookId) => dispatch => {
  return fetch('/su/returntobookstatus', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        bookId: bookId
      })
    })
    .then(res => {
      if (res.status === 200) {
        dispatch(suFetchBookData(bookId))
      } else {
        dispatch(setModal({
          isShow: true,
          modalTitle: "Something happend",
          modalText: ""
        }))
      }
    })
}


export const suReturnBookToLibrary = (userId, bookId) => dispatch => {
  return dispatch(suReturnToBookStatus(userId, bookId))
  .then(()=>dispatch(suCancelBook(userId, bookId)))
}


export const suDeleteComment = (bookId, commentId) => dispatch => {
  return fetch('/su/deletecomment', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      bookId: bookId,
      commentId: commentId
    })
  })
}


export const suAddNewBook = data => dispatch => {
  let formData = new FormData();
  formData.append("title", data.title);
  formData.append("year", data.year);
  formData.append("bookAthour", data.bookAthour);
  formData.append("bookDiscription", data.bookDiscription);
  formData.append("coverImage", data.coverImage);
  return fetch("/su/bookadd", {
      method: "POST",
      body: formData
    })
    .then(res => {
      if (res.status === 200) {
        dispatch(setModal({
          isShow: true,
          modalTitle: "Book add",
          modalText: "The book has been added to the library"
        }))
      } else {
        dispatch(setModal({
          isShow: true,
          modalTitle: "Book add faild",
          modalText: "Something happend"
        }))
      }
    })
}


export const suFetchBooksForManage = (filter) => dispatch => {
  return fetch(`/su/fetchbooksformanage/${filter}`)
    .then(res => res.json())
    .then(data => dispatch(suSetBooksForManage(data)))
}


const suSetBooksForManage = data => {
  return {
    type: "SET_BOOKS_FOR_MANAGE",
    data
  };
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


export const suSortManageBooksArr = (booksArr, sortBy) => dispatch => {
  let prop
  switch (sortBy) {
    case 'year':
      prop = 'year'
      break;
    case 'author':
      prop = 'bookAthour'
      break;
    case 'title':
      prop = 'title'
      break;
    case 'id':
      prop = '_id'
      break;
    case 'on hands time':
      prop = 'onHandsTime'
      break;
    default:
      prop = 'title'
  }
  let newArr = [...booksArr]
  const compareBookArr = (a, b) => {
    if (prop !== 'onHandsTime') {
      if (a[prop] < b[prop]) {
        return -1;
      } else {
        return 1;
      }
    } else {
      let aMaxTime = 0;
      let bMaxTime = 0;
      let now = Date.now()
      if (a.bookOnHandAt.length > 0) {
        a.bookOnHandAt.forEach((book, i) => {
          aMaxTime = ((now - book.dateOfHandOut) > aMaxTime) ? (now - book.dateOfHandOut) : aMaxTime
        })
      }
      if (b.bookOnHandAt.length > 0) {
        b.bookOnHandAt.forEach((book, i) => {
          bMaxTime = ((now - book.dateOfHandOut) > aMaxTime) ? (now - book.dateOfHandOut) : bMaxTime
        })
      }
      if (aMaxTime > bMaxTime) {
        return -1;
      } else {
        return 1;
      }
    }
  }
  newArr.sort(compareBookArr);
  dispatch(suSetBooksForManage(newArr));
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


export const suFetchUsersForManage = (exp) => dispatch => {
  return fetch('/su/fetchusersformanage', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      exp: exp
    })
  })
    .then(res => {return res.json()})
    .then(data => dispatch(suSetUsersForManage(data)))
}




export const suFetchUserData = userId => dispatch => {
  return fetch(`/su/fetchUserData/${userId}`)
    .then(res => res.json())
    .then(data => dispatch(setManagedUser(data)))
}


const setManagedUser = data => {
  return {
    type: "SET_MANAGED_USER",
    data
  }
}


const suSetUsersForManage = data => {
  return {
    type: "SET_USERS_FOR_MANAGE",
    data
  };
}


export const suBanUser = (userId, reason, ban) => dispatch => {
  return fetch('/su/banuser', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ban: ban,
      userId: userId,
      reason: reason
    })
  })
}
