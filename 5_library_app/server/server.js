const express = require("express");
const session = require("express-session");
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const { User } = require("./modules/mongo/mongo");
const app = express();
const jsonParser = express.json();

app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "login",
      passwordField: "pass"
    },
    function(username, password, done) {
      console.log(username);
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/"
//   })
// );
app.get("/login", function(req, res, next) {
  console.log(req);
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/users/" + user.username);
    });
  })(req, res, next);
});
// app.get("/", function(req, res) {
//   res.send("123");
// });

app.get("/createNewUser", (req, res) => {
  let newUser = new User({
    login: "coolMan",
    pass: "superpsw"
  });
  newUser.save().then(() => res.sendStatus(200), err => res.send(err));
});

app.post("/auth/login", jsonParser, (req, res) => {
  res.send("main");
});

app.listen(4000, err => {
  if (!err) {
    console.log("<<<Server started>>>");
  }
});
