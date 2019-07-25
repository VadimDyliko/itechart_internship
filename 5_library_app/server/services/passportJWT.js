const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("./mongo");
const {secretKey} = require("../config/constants")

const cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};
const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: secretKey
};

passport.use(
  new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne(
      {
        _id: jwt_payload.userId
      },
      function(err, user) {
        if (err) {
          console.log(err);
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    );
  })
);
