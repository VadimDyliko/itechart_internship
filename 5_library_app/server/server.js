const app = require('express')();
const server = require('http').Server(app);
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const io = require('socket.io')(server);
io.on('connection', function(socket) {
  socket.on('reqBookData', (book) => {
    getSingleBookData(book.bookId)
      .then((book) => {
        return {
          comments: book.comments,
          count: book.count,
          availableCount: book.availableCount
        }
      })
      .then((data) => socket.emit('resBookData', data))
  })
});

module.exports={
  io
}


const routes = require("./routes/routes");
const su = require("./routes/su");
const { User, Book } = require("./services/mongo");
const {getSingleBookData} = require("./services/books");
require("./services/passportJWT");


app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
app.use('/', routes);
app.use('/su', su);


server.listen(4000, err => {
  if (!err) {
    console.log("<<<Server started>>>");
  }
});
