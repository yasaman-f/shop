const nodemailer = require('nodemailer');
const crypto = require("crypto");
const { SECRET_KEY, REFRESH_KEY } = require('../../note');
const jwt = require("jsonwebtoken");
const { UserModel } = require('../models/user');
const redis = require("./initRedis")


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


function AccessToken(Id) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(Id)
        const payload = {
            mobile: user.mobile
        };
        const options = {
            expiresIn: "8h"
        };
        jwt.sign(payload, SECRET_KEY, options, (err, token) => {
            if (err) reject(Error.InternalServerError("Internal Server Error😬"), console.log(err));
            resolve(token)
        })
    })
}

function RefreshToken(Id) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(Id)
        const payload = {
            mobile: user.mobile
        };
        const options = {
            expiresIn: "1y"
        };
        jwt.sign(payload, REFRESH_KEY, options, async (err, token) => {
            if (err) reject(Error.InternalServerError("Internal Server Error😬"));
            await redis.SETEX(String(Id), (365 * 24 * 60 * 60), token)
            resolve(token)
        })
    })
}

module.exports = {
    hashPassword,
    verifyPassword,
    sendCode,
    RandomNumber,
    AccessToken,
    RefreshToken
}