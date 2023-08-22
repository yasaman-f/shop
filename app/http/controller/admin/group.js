const { StatusCodes: HttpStatus } = require('http-status-codes')
const Error = require('http-errors')
const Controller = require('../Controller')
const { groupSchema } = require('../../validator/admin/group')
const { GroupModel } = require('../../../models/group')
const { RemoveExcessData } = require('../../../utils/function')

class GroupController extends Controller {
  async addGroup (req, res, next) {
    try {
      const userID = req.user._id
      await groupSchema.validateAsync(req.body)
      if (await this.findGroup({title}))
        throw Error.BadRequest('Grouping already exists')
      const { title, description } = req.body
      const group = GroupModel.create({ title, description, userID })
      await this.findGroup({title})
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
  async editGroup (req, res, next) {
    try {
      const { id } = req.params
      await this.findGroup({ _id: id })
      const extraData = ['', ' ', 0, null, undefined, NaN]
      const data = req.body
      RemoveExcessData(data, extraData)
      const update = await GroupModel.updateOne({ _id: id }, { $set: data })
      if (!update.modifiedCount)
        throw Error.InternalServerError('The grouping was not edited')
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: 'The grouping was edited successfully'
        }
      })
    } catch (error) {
      next(error)
    }
  }
  async removeGroup (req, res, next) {
    try {
      const { id } = req.params
      const remove = await GroupModel.deleteOne({_id: id})
      if(!remove.deletedCount) throw Error.InternalServerError("The group was not deleted")
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "The group was deleted successfully"
        }
      })
    } catch (error) {
      next(error)
    }
  }
  async findGroup (title) {
    const group = GroupModel.findOne(title)
    if (!group) throw Error.NotFound('Group not found')
  }
}

module.exports = {
  GroupController: new GroupController()
}