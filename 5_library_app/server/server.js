const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const { User, Book } = require("./modules/mongo/mongo");
const token = require("./modules/services/jwt");
require("./modules/services/passportJWT");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.post("/singup", (req, res)=>{
  if (req.body.login && req.body.email && req.body.password){
    User.findOne({email: req.body.email})
     .then((user)=>{
       if (!user){
           let newUser = new User({
             email: req.body.email,
             password: req.body.password,
             login: req.body.login,
           });
           newUser.save()
           .then((user)=>{
             let payload = {
               jwt: token.setToken(user._id)
             };
             res.json(payload);
             console.log(`We got a new user ${user}`);
           })
       } else {
         res.sendStatus(401)
       }
     })
     .catch((err)=>{
       console.log(err);
       res.sendStatus(500)
     })
  } else {
    res.sendStatus(400)
  }
})

app.post("/login", (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        if (user.password === req.body.password) {
          let payload = {
            jwt: token.setToken(user._id)
          };
          res.json(payload);
        } else {
          res.sendStatus(401);
        }
      } else {
        res.sendStatus(404);
      }
    });
  }
});

app.get("/profile", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  //console.log(req.user);
  let payload = {
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    booksOnHand: req.user.booksOnHand
  }
  res.json(payload);
});

app.get('/books', (req, res)=>{
  Book.find()
  .then((books)=>res.json(books))
})

app.listen(4000, err => {
  if (!err) {
    console.log("<<<Server started>>>");
  }
});
