const {maxOnHandTime, loopTimeout} = require('../config/constants');
const {Book, User} = require('./mongo')
const {removeBookFromUser} = require('./books')
//const {main} = require('./mailer');

const checkExpiredOnHands = () => {
  return Book.find({bookOnHandAt: {$gt: []}})
      .then(books=>{
        books.forEach(book=>{
          book.bookOnHandAt.forEach(atUser=>{
            if (atUser.dateToReturn < Date.now()) {
              console.log('need to send email');
            }
          })
        })
      })
}

const checkExpiredBookin = () => {
  return Book.find({bookBookedBy: {$gt: []}})
      .then(books=>{
        books.forEach(book=>{
          book.bookBookedBy.forEach((byUser,i, arr)=>{
            if (byUser.datebookEnd < Date.now()) {
              console.log('need to back in library');
              removeBookFromUser(book._id, byUser.userId);
              arr.splice(i, 1);
            }
          })
          book.save()
        })
      })
}

const loop = () => {
  checkExpiredBookin()
  checkExpiredOnHands()
}

const mainLoop = setInterval(loop, loopTimeout)
