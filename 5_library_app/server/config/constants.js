const dbLogin = 'libraryapp';
const dbPassword = 'supersecret';
const dbUrl = {
  url: `mongodb+srv://${dbLogin}:${dbPassword}@cluster0-vyplv.mongodb.net/users`
};
const secretKey = 'supersecretkey';
const messages = {
  newUserMessage: 'We got a new User ',
  XSSMessage: 'XSS has detected',
  userLoginMessage: 'User has singin',
  deletedByModer: "This comment deleted by moderator"
};
const maxBookingTime = 1000 * 60 * 60 * 48;
const maxOnHandTime = 1000 * 60 * 60 * 24 * 30;
const loopTimeout = 1000 * 60 * 60;
module.exports = {
  dbUrl,
  secretKey,
  messages,
  maxBookingTime,
  maxOnHandTime,
  loopTimeout
}
