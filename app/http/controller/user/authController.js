const { UserModel } = require('../../../models/user')
const { hashPassword, verifyPassword, RandomNumber, sendCode } = require('../../../utils/function')
const { singUpSchema,loginSchema, forgetPasswordSchema } = require('../../validator/user/loginSchema')
const { StatusCodes: HttpStatus } = require('http-status-codes')
const Error = require("http-errors")
const Controller = require('../Controller')

class UserAuthController extends Controller {
  async signUp (req, res, next) {
    try {
      await singUpSchema.validateAsync(req.body)
      let { password, mobile, email, username } = req.body
      password = hashPassword(req.body.password)
      const user = await UserModel.create({ password, mobile, email, username })
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: 'User sing up was successful'
        }
      })
    } catch (error) {
      next(error)
    }
  }
  async login (req, res, next) {
    try {
      await loginSchema.validateAsync(req.body)
      let { email, password } = req.body
      const user = await UserModel.findOne({email})
      if(!user) throw Error.NotFound("User with this email was not found. Please register ")
      const VerifyPassword = verifyPassword(password, user.password)
      if(VerifyPassword == true){
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: {
                message: "Login was successful"
            }
        })
      }else{
        res.json({
            message: "The password is incorrect"
        })
      }
    } catch (error) {
      next(error)
    }
  }
  async forget(req, res, next){
    try{
        await forgetPasswordSchema.validateAsync(req.body)
        const { email } = req.body
        const user = await UserModel.findOne({email})
        if(!user) throw Error.NotFound("User with this email was not found")
        const code = RandomNumber().toString()
        const update =  await UserModel.updateOne({"user.otp.code": code})
        sendCode(email, code)
        return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    meesage: "Please check your email and enter the code sent"
                }
            })
    }catch(error){
        next(error)

    }
 }
 async checkOtp(req, res, next){
    try {
        
    } catch (error) {
        next(error)
    }
 }
}

module.exports = {
  UserAuthController: new UserAuthController()
}
