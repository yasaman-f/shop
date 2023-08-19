const nodemailer = require('nodemailer');
const crypto = require("crypto")

function hashPassword(pass) {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(pass, salt, 1000, 64, "sha512").toString('hex')
    const newHash = `$2.${salt}.${hash}`
    return newHash 
}

function verifyPassword(pass, hashPassword) {
    const salt = hashPassword.split(".")?.[1]
    const hash = crypto.pbkdf2Sync(pass, salt, 1000, 64, "sha512").toString('hex')
    const newHash = `$2.${salt}.${hash}`
    return (newHash === hashPassword) 
}


function sendCode(email, code) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yasi.fani.85@gmail.com',
        pass: 'fzqvxdzsiuphkeur'
      }
    });
    
    var mailOptions = {
      from: 'yasi.fani.85@gmail.com',
      to: email,
      subject: 'Sending otp with email',
      text: code
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });   
}

function RandomNumber() {
    return Math.floor((Math.random() * 90000) + 10000)
}

module.exports = {
    hashPassword,
    verifyPassword,
    sendCode,
    RandomNumber
}