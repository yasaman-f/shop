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
        const product = await ProductModel.findOne({_id: productID})
        product.comments = Comment
        const productUpdate = await ProductModel.updateOne({_id: productID}, {$push: {comments: Comment}})
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
  async addAnswerComment(req, res , next){
    try {
        await AnswerSchema.validateAsync(req.body)
        const userID = req.user._id
        const {  productID } = req.params
        const { commentID, comment } = req.body
        const commentOrg = await CommentModel.findById({_id: commentID})
        const ProductUpdate = await ProductModel.updateOne({_id: productID}, {$pull: {commentID}})
        
        let Comment = {}
        Comment.userID = userID.toString()
        Comment.productID = productID 
        Comment.parentId = commentID
        Comment.comment = comment
        Comment = [Comment]
        const answer = await CommentModel.updateOne({_id: commentID}, {$push: {answers: Comment} })
        commentOrg.answers = Comment
        if(!answer.modifiedCount) throw Error.InternalServerError("Your comment was not registered")
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
  async editCommentByProductID (req, res, next){
    try {
        const {  productID } = req.params

        return res.status(HttpStatus.OK).json({
            StatusCode: HttpStatus.OK,
            data: {
                message: ""
            }
        })
    } catch (error) {
        next(error)
    }
  }
}

module.exports = {
    CommentController: new CommentController()
}
