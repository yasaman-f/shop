const { UserModel } = require("../../../models/user")
const { hashPassword } = require("../../../utils/function")
const { singUpSchema } = require("../../validator/user/loginSchema")
const { StatusCodes: HttpStatus } = require("http-status-codes")
const Controller = require("../Controller")

class UserAuthController extends Controller {
    async signUp(req, res, next){
        try {
        console.log("hello world");
        await singUpSchema.validateAsync(req.body)
        let { password, mobile, email, username } = req.body
        password = hashPassword(req.body.password)
        const user = await UserModel.create({password, mobile, email, username})
        return res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            data: {
                user
            }
        })
        } catch (error) {
            next(error)
        } 
    }
}

module.exports = {
    UserAuthController: new UserAuthController()
}