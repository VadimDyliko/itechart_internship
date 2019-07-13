const secretKey = "supersecretkey";
const jwt = require("../../node_modules/jsonwebtoken");

const token = {
  setToken: userId => {
    let expDate = Date.now() + 1000*60
    let payload = {
      userId: userId,
      exp: expDate,
      iat: Date.now()
    };
    let token = jwt.sign(payload, secretKey);
    return token;
  },

  verifyToken: token => {
    return jwt.verify(token, secretKey, (err, decodedToken) => {
      if (decodedToken) {
        return decodedToken;
      } else {
        return false;
        console.log(err);
      }
    });
  }
};

module.exports = token;
