const {maxOnHandTime, loopTimeout} = require('../config/constants');
const {Book, User} = require('./mongo')


const loop = () => {
  Book.find({bookOnHandAt: {$gt: []}})
    .then(books=>{
      books.forEach(book=>{
        book.bookOnHandAt.forEach(atUser=>{
          if (atUser.dateToReturn < Date.now()) {
            console.log('need to back');
          }
        })
      })
    })
}

const mainLoop = setInterval(loop, loopTimeout)
