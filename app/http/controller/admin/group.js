const { StatusCodes: HttpStatus } = require('http-status-codes')
const Error = require('http-errors')
const Controller = require('../Controller')
const { groupSchema } = require('../../validator/admin/group')
const { GroupModel } = require('../../../models/group')

class GroupController extends Controller {
  async addGroup (req, res, next) {
    try {
      const userID = req.user._id
      await groupSchema.validateAsync(req.body)
      const { title, description } = req.body
      const group = GroupModel.create({ title, description, userID })
      await this.findGroup(title)
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: 'Grouping added successfully'
        }
      })
    } catch (error) {
      next(error)
    }
  }
  async getGroup (req, res, next) {
    try {
      const group = await GroupModel.find({})
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          group
        }
      })
    } catch (error) {
      next(error)
    }
  }
  async findGroup (title) {
    const group = GroupModel.findOne({ title })
    if (!group) throw Error.NotFound('Group not found')
  }
}

module.exports = {
  GroupController: new GroupController()
}
