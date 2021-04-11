// const config = require('../../secret.js');

const mailer = require('nodemailer');
const host = require("../../server");
//const port = 5000;

const config = {
    emailUsername: 'mmamalek@student.wethinkcode.co.za',
    emailPassword: 'averysimplepasswordcreatedformatcha'
}

const Email = function(){
    this.email = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: config.emailUsername,
            pass: config.emailPassword
        }
    });

    this.send = (to, from, subject, message) => {
        
        const mailOptions = {
            from,
            to,
            subject,
            text: message
        };

        this.email.sendMail(mailOptions, (err, res) => {
            if(err) {
                console.log(err);
            } else {
                console.log('Email sent: ' + res.response);
            }
        })
    }

    this.activationEmail = (emailAddress, userId, activationCode) => { 
        msg = `
        Welcome to matcha. Please click the link below to activate your account:
        
        http://${host.url}:3000/activate/${userId}/${activationCode}`



        this.send(emailAddress, config.emailUsername, "Matcha account activation", msg)
    }

    this.passwordResetEmail = (emailAddress, activationCode) => { 
        msg = `
        You have requested to reset you matcha Password. Please copy and paste the follow OTP

        ${activationCode}`



        this.send(emailAddress, 'mmamalek@student.wethinkcode.co.za', "Passord reset OTP", msg)
    } 
}

const email = new Email();

module.exports = new Email();