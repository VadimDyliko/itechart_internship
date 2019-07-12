const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("../mongo/mongo");

const headerExtractor = function(req) {
  console.log(req.headers.authorization);
  var token = null;
  if (req && req.headers.authorization) {
    token = req.headers.authorization;
  }
  return token;
};
const opts = {
  jwtFromRequest: headerExtractor,
  secretOrKey: "supersecretkey"
};

passport.use(
  new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    User.findOne({ _id: jwt_payload.userId }, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);
