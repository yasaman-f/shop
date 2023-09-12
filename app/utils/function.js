const nodemailer = require('nodemailer');
const crypto = require("crypto");
const { SECRET_KEY, REFRESH_KEY } = require('../../note');
const jwt = require("jsonwebtoken");
const { UserModel } = require('../models/user');
const redis = require("./initRedis")
const Error = require("http-errors");
const { stringToArray } = require('../http/middleware/stringToArray');
const path = require('path');
const { ProductModel } = require('../models/product');



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

function verifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_KEY, async (err, payload) => {
            if (err) reject(Error.Unauthorized("please login ...!"))
            const { mobile } = payload || {}

            const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 })
            if (!user) reject(Error.Unauthorized("User is not found"))

            const refreshToken = await redis.get(String(user?._id))
            if (!refreshToken) reject(Error.Unauthorized("Failed to reLogin to the user account"))

            if (token === refreshToken) return resolve(mobile)
            reject(Error.Unauthorized("Failed to reLogin to the user account"))

        })
    })
}

function RemoveExcessData(data, fixedData = []){
    let emptyData = [{}, [], "", " ", "0", 0, null, undefined]
    Object.keys(data).forEach(key => {
        console.log(data[key]);
        if (fixedData.includes(key)) delete data[key]
        if (key == {}) delete data[key]
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
        if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]
        if (emptyData.includes(data[key])) delete data[key];
        
    })
    return data
}

function putArrayOfImage(files, fileUploadPath) {
    if (files?.length > 0) {
        const images = []
        let image = (files.map(file => path.join(fileUploadPath, file.filename))).map(item => item.replace(/\\/g, "/"))
        image.forEach(key => {
            image = `http://localhost:5000/${key}` 
            images.push(image)
        })
        return images
 
        
    } else {
        return []
    }
}

function setFeture(body) {
    let { colors, width, height, length, weight } = body;
    if(colors != ''|| width != ''|| height != ''|| length != ''|| weight != ''){
        let feature = {};
        if (colors != '' && colors != undefined){ 
            colors = stringToArray(colors);
            feature.colors = colors
        }
        if (+width != '') feature.width = +width;
        if (+height != '') feature.height = +height;
        if (+length != '') feature.length = +length;
        if (+weight != '') feature.weight = +weight;
        return feature
    }
}

function checkColor(colors, listOfColor) {
    const Color = []
    colors.forEach(color => {
        if (!(listOfColor.includes(color))){ 
            return Error.BadRequest("Unfortunately we don't have this color of this product")
        } else {
            Color.push(color)
        }
    })
    return Color
}

function editRoleInUser(role, newRole) {
    if(!(newRole == "")){
    const users = role.users
    users?.forEach( async user => {
        const findUser = await UserModel.updateOne({_id: user}, {$set: {roles: [newRole]}})
    })}
}

function removeRoleInUser(role) {
    const users = role.users
    users.forEach( async user => {
        const findUser = await UserModel.updateOne({_id: user}, {$set: {roles: []}})
    })
}

module.exports = {
    hashPassword,
    verifyPassword,
    sendCode,
    RandomNumber,
    AccessToken,
    RefreshToken,
    verifyRefreshToken,
    RemoveExcessData,
    putArrayOfImage,
    setFeture,
    checkColor,
    editRoleInUser,
    removeRoleInUser
}