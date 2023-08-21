const jwt = require("jsonwebtoken")
const Error = require("http-errors")
const { UserModel } = require("../../models/user")
const { SECRET_KEY } = require("../../../note")

function getToken(params) {
    const [bearer, token] = params?.authorization.split(" ") || []
    if(["Bearer", "bearer" && token].includes(bearer)) return token
    throw Error.Unauthorized("User panel not found. Please signUp/Login")
}

function verifyToken(req, res, next){
    try{ 
    if (req.headers.authorization == undefined) throw Error.BadRequest("Please login/signUp first")
    const token = getToken(req.headers)
    jwt.verify(token, SECRET_KEY, async (err, payload) => {
    try{
            if(err) throw Error.Unauthorized("Please login ...!")
            const {mobile} = payload || {}
            const user = await UserModel.findOne({mobile}, {password: 0, otp: 0})
            if (!user ) throw Error.Unauthorized("User pannel not found")
            req.user = user
            return next()
    } catch (error){
        next(error);
    }
    });
    }catch(error){
        next(error);
    }
}

module.exports = {
    verifyToken
}