const nodemailer = require('nodemailer');
const { emailParams } = require('../config/constants');
const { User } = require('./mongo');
const transporter = nodemailer.createTransport(emailParams);
const logger = require('./winston');

function sendMail(userId, title, athour, year) {
  console.log(userId, title, athour, year);
  User.findById(userId)
    .then(user=>user.email)
    .then(email=>{
      let mailOptions = {
        from: emailParams.auth.user,
        to: email,
        subject: 'return the book',
        text: `You must return the book, ${title} ${athour} ${year} to the library, your on hands time is over.`
      };
      transporter.sendMail(mailOptions)
        .then((data)=>logger.info(`mail sended to ${userId} about book ${title} ${athour} ${year}`))
    })
    .catch(err=>logger.err(err.message))


}


module.exports = {
  sendMail
}
