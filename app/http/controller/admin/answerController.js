const { StatusCodes: HttpStatus } = require('http-status-codes')
const Error = require('http-errors')
const path = require('path')
const { stringToArray } = require('../../middleware/stringToArray')
const { CommentSchema, AnswerSchema } = require('../../validator/admin/comment')
const { CommentModel, AnswerModel } = require('../../../models/comment')
const Controller = require('../Controller')
const { ProductModel } = require('../../../models/product')
const { updateAnswer, deleteAnswer } = require('../../middleware/updateAnswer')

class AnswerController extends Controller {
  async addAnswer (req, res, next){
    try {
        const { commentID } = req.params
        const userID = req.user._id
        const { comment } = req.body

        const commentOrg = await CommentModel.findOne({_id: commentID})

        const answer = {}
        answer.comment = comment
        answer.parentId = commentID
        answer.userID = userID
        answer.productID = commentOrg.productID

        const answerCreate = await AnswerModel.create(answer)
        const commentAnswer = await CommentModel.updateOne({ _id: commentID }, {$push: {answers: answerCreate}})
        if(!answerCreate && !commentAnswer.modifiedCount) throw Error.InternalServerError("your reply was not added")

        return res.status(HttpStatus.CREATED).json({
          statusCode: HttpStatus.CREATED,
          data: {
            answerCreate
          }
        })
    } catch (error) {
        next(error)
    }
  }
  async editComment (req, res, next) {
    const { answerID } = req.params
    const { comment } = req.body
    const { show } = req.query

    const Comment = await AnswerModel.findById({_id: answerID})
    
    if(!Comment) throw Error.NotFound("The desired comment was not found")

    const extraData = ["", " ", 0, -1, NaN, undefined, null, "empty", "nothing"]

    const Answer = Comment
    if(!extraData.includes(comment)) Answer.comment = comment

    if(show == 'false'){
        const Delete = await AnswerModel.deleteOne({_id: answerID})
        const orgComment = await CommentModel.findOne({_id: (Comment.parentId).toString()})
        deleteAnswer(orgComment, answerID, Comment.parentId.toString(), comment)
        if (!Delete.deletedCount) throw Error.InternalServerError("The selected comment was not deleted")

    }else{
        const updateComment = await AnswerModel.updateOne({_id: answerID}, {$set: Answer})
        const orgComment = await CommentModel.findOne({_id: (Comment.parentId).toString()})
        updateAnswer(orgComment, answerID, Comment.parentId.toString(), comment)
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
    AnswerController: new AnswerController()
}
