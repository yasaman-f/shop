const { UserModel } = require('../../../models/user')
const { hashPassword, verifyPassword } = require('../../../utils/function')
const { singUpSchema,loginSchema } = require('../../validator/user/loginSchema')
const { StatusCodes: HttpStatus } = require('http-status-codes')
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
}

module.exports = {
  UserAuthController: new UserAuthController()
}
