const dbUrl = {
  url: "mongodb+srv://libraryapp:supersecret@cluster0-vyplv.mongodb.net/users"
};
const secretKey = 'supersecretkey'
const messages = {
  newUserMessage: 'We got a new User ',
  XSSMessage: 'XSS has detected',
  userLoginMessage: 'User has singin'
}
const XSSRegExp = /<|>|\//gi
module.exports = {
  dbUrl,
  secretKey,
  messages
}
