const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const { User } = require("./modules/mongo/mongo");
const token = require("./modules/services/jwt");
require("./modules/services/passportJWT");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

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
  console.log(req.user);
  res.sendStatus(200);
});

app.listen(4000, err => {
  if (!err) {
    console.log("<<<Server started>>>");
  }
});
