const dbUrl = {
  url: "mongodb+srv://libraryapp:supersecret@cluster0-vyplv.mongodb.net/users"
};
const secretKey = 'supersecretkey'
const messages = {
  newUserMessage: 'We got a new User ',
  XSSMessage: 'XSS has detected',
  userLoginMessage: 'User has singin'
}
const maxBookingTime = 1000 * 60 * 60 * 48; //ms
const maxOnHandTime = 1000 * 60 * 60 * 24 * 30; //ms
const loopTimeout = 1000 * 60; //ms
module.exports = {
  dbUrl,
  secretKey,
  messages,
  maxBookingTime,
  maxOnHandTime,
  loopTimeout
}
