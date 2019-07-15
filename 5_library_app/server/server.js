const express = require("express");
const passport = require("passport");
const crypto = require('crypto');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});
const {
  User,
  Book
} = require("./modules/mongo/mongo");
const token = require("./modules/services/jwt");
require("./modules/services/passportJWT");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser())
app.use(passport.initialize());

app.post("/singup", upload.single('profilePicture'), (req, res) => {
  console.log(req.body);
  if (req.body.login && req.body.email && req.body.password) {
    let xss = /<|>|\//ig
    if (!req.body.login.search(xss)) {
      console.log("XSS");
      res.sendStatus(400)
    } else {
      let matchLogin = new Promise((res, rej) => {
        User.findOne({
            login: req.body.login
          })
          .then(login => res(login))
      })
      let matchEmail = new Promise((res, rej) => {
        User.findOne({
            email: req.body.email
          })
          .then(email => res(email))
      })
      Promise.all([matchLogin, matchEmail])
        .then((values) => {
          if (values[0] === null && values[1] === null) {
            let newUser = new User({
              email: req.body.email,
              password: req.body.password,
              login: req.body.login,
            });
            if (req.file) newUser.profilePicture = req.file.buffer
            newUser.save()
              .then((user) => {
                res.cookie('jwt', token.setToken(user._id), {
                  expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                  httpOnly: true
                });
                res.sendStatus(200)
                console.log(`We got a new user ${user}`);
              })
          } else {
            console.error('we have user with such email or login');
            res.sendStatus(401)
          }
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500)
        })
    }
  } else {
    console.error('there are note important user data');
    res.sendStatus(400)
  }
})


app.post("/login", (req, res) => {
  console.log(`----->>>/login req.body:`);
  console.log(req.body);
  if (req.body.login && req.body.password) {
    User.findOne({
      login: req.body.login
    }, (err, user) => {
      if (user) {
        if (user.password === req.body.password) {
          res.cookie('jwt', token.setToken(user._id), {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true
          });
          res.sendStatus(200)
        } else {
          res.sendStatus(401);
        }
      } else {
        res.sendStatus(404);
      }
    });
  }
});

app.get("/profile", passport.authenticate("jwt", {
  session: false
}), function(
  req,
  res
) {
  console.log("--->>>/profile req.cookies: ");
  console.log(req.cookies);
  let payload = {
    login: req.user.login,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    booksOnHand: req.user.booksOnHand,
    profilePicture: req.user.profilePicture
  }
  res.json(payload);
});

app.get('/books', (req, res) => {
  Book.find()
    .then((books) => res.json(books))
})

app.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.sendStatus(200)
})

app.post('/identityCheck', (req, res) => {
  let newCheck = Object.keys(req.body)
  let key = newCheck[0];
  User.findOne({
      [key]: [req.body[key]]
    })
    .then((user) => {
      if (user === null) {
        res.sendStatus(200)
      } else {
        res.sendStatus(401)
      }
    })
    .catch((err) => console.log(err))
})

// app.get('/test', (req, res) => {
//   User.findOne({
//       login: 'root'
//     })
//     .then((user) => res.send(user))
// })

app.listen(4000, err => {
  if (!err) {
    console.log("<<<Server started>>>");
  }
});
