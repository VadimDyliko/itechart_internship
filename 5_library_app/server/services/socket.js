const socketio = require('socket.io')
const {getSingleBookData} = require("./books")

module.exports = function(app){
    io = socketio.listen(app)

    io.on('connection', function(socket) {
      socket.on('reqBookData', (book) => {
        getSingleBookData(book.bookId)
          .then((book) => {
            return book.comments
          })
          .then((book) => socket.emit('resBookData', book))
      })
      socket.on('addComment', (comment) => {
        io.emit(`commentAddedTo${comment.bookId}`)
      })
    });

    return io
}
