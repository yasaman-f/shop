const joi = require("@hapi/joi")
const Error = require("http-errors")


const AnswerSchema = joi.object({
    productID: joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(Error.BadRequest("The productID is incorrect")),
    comment: joi.string().min(4).error(Error.BadRequest("The comment is incorrect")),
    show: joi.boolean().error(Error.BadRequest("Show should only be shown with yes or no")),
    parentId: joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(Error.BadRequest("The parentId is incorrect")),
    childrenId: joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(Error.BadRequest("The childrenId is incorrect")),
})


const CommentSchema = joi.object({
    productID: joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(Error.BadRequest("The productID is incorrect")),
    comment: joi.string().min(4).error(Error.BadRequest("The comment is incorrect")),
    show: joi.boolean().error(Error.BadRequest("Show must only be shown with yes or no")),
    parent: joi.string().empty().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(Error.BadRequest("The parent is incorrect")),
})


module.exports = {
    AnswerSchema,
    CommentSchema
}