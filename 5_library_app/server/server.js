const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");
const { User, Book } = require("./services/mongo");
const {getSingleBookData} = require("./services/books")
require("./services/passportJWT");


app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
app.use('/', routes);


io.on('connection', function(socket) {
  socket.on('reqBookData', (book) => {
    getSingleBookData(book.bookId)
      .then((book) => {
        return book
      })
      .then((book) => socket.emit('resBookData', book))
  })
  socket.on('addComment', (comment) => {
    io.emit(`commentAddedTo${comment.bookId}`)
  })
});


server.listen(4000, err => {
  if (!err) {
    console.log("<<<Server started>>>");
  }
});
