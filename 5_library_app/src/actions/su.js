import {setModal} from './index'

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
    .then(()=>dispatch(suFetchUsersForManage()))
}


const setManagedUser = data => {
  return {
    type: "SET_MANAGED_USER",
    data
  }
}
