const express = require("express");
const session = require("express-session");
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const { User } = require("./modules/mongo/mongo");
const app = express();
//const jsonParser = express.json();

app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
      //passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email: email });

        if (!user) return done(null, falses);
        if (!user.validPassword(password)) return done(null, false);
        return done(null, user);
      } catch (error) {
        done(error, false);
      }
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
app.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/profile",
    failureRedirect: "/login"
  })
);

app.get("/profile", (req, res) => {
  res.send(profile);
});
// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/"
//   })
// );
// app.get("/login", function(req, res, next) {
//   console.log(req);
//   passport.authenticate("local", function(err, user, info) {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.redirect("/login");
//     }
//     req.logIn(user, function(err) {
//       if (err) {
//         return next(err);
//       }
//       return res.redirect("/users/" + user.username);
//     });
//   })(req, res, next);
// });
// app.get("/", function(req, res) {
//   res.send("123");
// });

app.get("/createNewUser", (req, res) => {
  let newUser = new User({
    email: "coolMan@mail.com",
    password: "superpsw"
  });
  newUser.save().then(() => res.sendStatus(200), err => res.send(err));
});

app.post("/auth/login", (req, res) => {
  console.log(req.body);
  res.send("main");
});

app.listen(4000, err => {
  if (!err) {
    console.log("<<<Server started>>>");
  }
});
