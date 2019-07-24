const express = require("express");
const passport = require("passport");
const crypto = require("crypto");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { User, Book } = require("../services/mongo");
const token = require("../services/jwt");
const router = express.Router();
const {secretKey} = require("../config/constants");

router.post("/singup", upload.single("profilePicture"), (req, res) => {
  console.log(req.body);
  if (req.body.login && req.body.email && req.body.password) {
    //
    let xss = /<|>|\//gi;
    if (!req.body.login.search(xss)) {
      //
      console.log("XSS");
      res.sendStatus(400);
    } else {
      let matchLogin = new Promise((res, rej) => {
        User.findOne({
          login: req.body.login
        }).then(login => res(login));
      });
      let matchEmail = new Promise((res, rej) => {
        User.findOne({
          email: req.body.email
        }).then(email => res(email));
      });
      Promise.all([matchLogin, matchEmail])
        .then(values => {
          if (values[0] === null && values[1] === null) {
            let newUser = new User({
              email: req.body.email,
              password: crypto
                .createHmac("sha256", secretKey)
                .update(req.body.password)
                .digest("hex"),
              login: req.body.login
            });
            if (req.file) newUser.profilePicture = req.file.buffer;
            newUser.save().then(user => {
              res.cookie("jwt", token.setToken(user._id), {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                httpOnly: true
              });
              res.sendStatus(200);
              //
              console.log(`we got a new user ${user}`);
            });
          } else {
            //we have user with such email or login
            res.sendStatus(401);
          }
        })
        .catch(err => {
          console.error(err);
          res.sendStatus(500);
        });
    }
  } else {
    //there are not important user data in request
    res.sendStatus(400);
  }
});

router.post("/login", (req, res) => {
  //
  console.log(`----->>>/login req.body:`);
  console.log(req.body);
  if (req.body.login && req.body.password) {
    User.findOne(
      {
        login: req.body.login
      },
      (err, user) => {
        if (user) {
          if (
            user.password ===
            crypto
              .createHmac("sha256", secretKey)
              .update(req.body.password)
              .digest("hex")
          ) {
            res.cookie("jwt", token.setToken(user._id), {
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
              httpOnly: true
            });
            res.sendStatus(200);
          } else {
            res.sendStatus(401);
          }
        } else {
          res.sendStatus(404);
        }
      }
    );
  }
});

router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false
  }),
  function(req, res) {
    let payload = {
      login: req.user.login,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      booksOnHand: req.user.booksOnHand,
      profilePicture: req.user.profilePicture
    };
    res.json(payload);
  }
);

router.get("/books", (req, res) => {
  Book.find()
    .then(books =>books.map(book=>{
      return newBook = {
        _id: book._id,
        tittle: book.tittle,
        year: book.year,
        bookAthour: book.bookAthour
      }
    }))
    .then(books =>{
      console.log(books);
       res.json(books)
     })
});

router.get("/books/cover/:bookId", (req,res)=>{
  console.log('requesting cover for ', req.params.bookId);
  Book.findById(req.params.bookId)
  .then(book => {return {
      _id: book._id,
      bookPicture: book.bookPicture
    }})
  .then(book=>res.json(book))
  .catch((err)=>console.log(err))
})
// router.get("/books", (req, res) => {
//   Book.find().then(books => res.json(books));
// });

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.sendStatus(200);
});

router.post("/identityCheck", (req, res) => {
  console.log(req.body);
  let newCheck = Object.keys(req.body);
  let key = newCheck[0];
  User.findOne({
    [key]: [req.body[key]]
  })
    .then(user => {
      if (user === null) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    })
    .catch(err => console.log(err));
});

router.post('/bookAdd', upload.single("bookPicture"), (req,res)=>{
  console.log(req.body);
  console.log(req.file.buffer);
  let newBook = new Book({
    tittle: req.body.title,
    year: req.body.year,
    bookAthour: req.body.bookAthour,
    bookDiscription: req.body.bookDiscription,
    bookPicture: req.file.buffer,
  })
  newBook.save()
  .then(()=>res.sendStatus(200))
  .catch((err)=>console.log(err))
})



module.exports = router
