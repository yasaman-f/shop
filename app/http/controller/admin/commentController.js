const { StatusCodes: HttpStatus } = require('http-status-codes')
const Error = require('http-errors')
const path = require('path')
const { stringToArray } = require('../../middleware/stringToArray')
const { CommentSchema, AnswerSchema } = require('../../validator/admin/comment')
const { CommentModel, AnswerModel } = require('../../../models/comment')
const Controller = require('../Controller')
const { ProductModel } = require('../../../models/product')

class CommentController extends Controller {
  async addComment (req, res, next){
    try {
        await CommentSchema.validateAsync(req.body)
        const userID = req.user._id
        const {  productID } = req.params
        const { comment } = req.body
        const Comment = await CommentModel.create({ userID, productID, comment })
        if (!Comment) throw Error.InternalServerError("Your comment was not registered")
        return res.status(HttpStatus.CREATED).json({
            StatusCode: HttpStatus.CREATED,
            data: {
                message: "Your comment was registered"
            }
        })
    } catch (error) {
        next(error)
    }
  }
  async editComment (req, res, next) {
    const {commentID} = req.params
    const { comment } = req.body
    const { show } = req.query
    const Comment = await CommentModel.findById({_id: commentID})
    if(!Comment) throw Error.NotFound("The desired comment was not found")
    if(Comment.answers){
        Comment.isParent = true
    }
    const extraData = ["", " ", 0, -1, NaN, undefined, null, "empty", "nothing"]
    if(!extraData.includes(comment)){
        Comment.comment = comment
    }
    if(show == 'false'){
        const Delete = await CommentModel.deleteOne({_id: commentID})
        if (!Delete.deletedCount) throw Error.InternalServerError("The selected comment was not deleted")
    }else{
        const updateComment = await CommentModel.updateOne({_id: commentID}, {$set: Comment})
        if(!updateComment.modifiedCount) throw Error.InternalServerError("The selected comment was not updated")
    }
    return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
            message: "The selected comment was updated"
        }
    })
  }
}
module.exports = {
    CommentController: new CommentController()
}
