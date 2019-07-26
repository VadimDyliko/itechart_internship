const { User } = require("./mongo");
const token = require("./jwt");
const crypto = require("crypto");
const { secretKey, XSSRegExp, messages } = require("../config/constants");


const singUp = (req, res) => {
  if (!req.body.login.search(/<|>|\//gi)) {
    console.log(messages.XSSMessage);
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
            console.log(messages.newUserMessage, user);
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
}


const logIn = (req, res) => {
  User.findOne({
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


const identityCheck = (req, res) => {
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
}


const getProfile = (req, res) => {
  let payload = {
    _id: req.user._id,
    login: req.user.login,
    email: req.user.email,
    booksOnHand: req.user.booksOnHand
  };
  res.json(payload);
}


const getUserAvatar = (req, res) => {
  User.findById(req.params.userId)
  .then(user=>{
    res.set('Content-Type', 'image/jpeg');
    res.send(user.profilePicture)
  })
  .catch((err)=>console.log(err))
}


module.exports = {
  singUp,
  logIn,
  identityCheck,
  getUserAvatar,
  getProfile
}
