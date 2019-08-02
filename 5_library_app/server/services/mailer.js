
const nodemailer = require('nodemailer');

async function main() {
    let transporter = nodemailer.createTransport({
        sendmail: true,
        newline: 'windows',
        logger: false
    });

    let message = {
        from: 'Andris <andris@kreata.ee>',
        to: 'Andris Reinman <vadimdyliko@gmail.com>',
        bcc: 'andris@ethereal.email',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html:
            '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
            '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',
    };

    let info = await transporter.sendMail(message);
    console.log('Message sent successfully as %s', info.messageId);
}

main().catch(err => {
    console.error(err.message);
    process.exit(1);
});
