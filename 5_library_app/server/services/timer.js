const { maxOnHandTime, loopTimeout } = require('../config/constants');
const { Book, User } = require('./mongo');
const { removeBookFromUser } = require('./books');
const logger = require('./winston');
const { sendMail } = require('./mailer');

const checkExpiredOnHands = () => {
  return Book.find({ bookOnHandAt: { $gt: [] } })
    .then(books => {
      books.forEach(book => {
        book.bookOnHandAt.forEach(atUser => {
          if (atUser.dateToReturn < Date.now()) {
            sendMail(atUser.userId, book.title, book.bookAthour, book.year);
          }
        })
      })
    })
}

const checkExpiredBookin = () => {
  return Book.find({ bookBookedBy: { $gt: [] } })
    .then(books => {
      books.forEach(book => {
        book.bookBookedBy.forEach((byUser, i, arr) => {
          if (byUser.datebookEnd < Date.now()) {
            removeBookFromUser(book._id, byUser.userId);
            arr.splice(i, 1);
            logger.info(`auto unbooking book ${book._id} from user ${byUser.userId}`)
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
