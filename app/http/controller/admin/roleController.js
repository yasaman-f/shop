const { StatusCodes: HttpStatus } = require('http-status-codes')
const Error = require('http-errors')
const Controller = require('../Controller')
const { RoleModel } = require('../../../models/role')
const { roleSchema } = require('../../validator/admin/role')
const { UserModel } = require('../../../models/user')

class RoleController extends Controller {
  async addRole(req, res, next){
    try {
        await roleSchema.validateAsync(req.body)
        const {role, permission} = req.body
        const userID = req.user._id 
        const createRole = await RoleModel.create({role, permission, creator : userID})
        if (!createRole) throw Error.InternalServerError("The role was not created")
        return res.status(HttpStatus.CREATED).json({
            StatusCode: HttpStatus.CREATED,
            data: {
              message: 'Role created'
            }
          })
    } catch (error) {
        next(error)
    }
  }
  async getRole (req, res, next) { 
    try {
        const { search } = req.query
        const dataBase = {}
        if (search) dataBase['$text'] = { $search: search }
        const role = await RoleModel.find(dataBase)
        return res.status(HttpStatus.OK).json({
          StatusCode: HttpStatus.OK,
          data: {
            role
          }
        })
    } catch (error) {
      next(error)
    }
  }
  async addUserToRole(req, res, next){
    try {
        const { roleID, userID } = req.body
        const role = await RoleModel.findOne({_id: roleID})
        const user  = await UserModel.findOne({_id: userID})
        user.roles = role.role
        console.log(role);
        console.log(user);
        const updateUser = await UserModel.updateOne({_id: userID}, {$set: user})
        if(!(role.users.includes(userID.toString()))){
        const updateRole = await RoleModel.updateOne({_id: roleID}, {$push: {users: [user]} })
        if(!updateUser.modifiedCount && !updateRole.modifiedCount ) throw Error.InternalServerError("Failed to create role for this user")
        }else{
            throw Error.BadRequest("This user has already received this role")
        }
        return res.status(HttpStatus.CREATED).json({
            StatusCode: HttpStatus.CREATED,
            data: {
              message: "Role creation for this user was successful"
            }
          })
    } catch (error) {
        next(error)
    }
  }
}
module.exports = {
    RoleController: new RoleController()
}
