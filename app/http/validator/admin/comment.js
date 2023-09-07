const joi = require("@hapi/joi")
const Error = require("http-errors")




const CommentSchema = joi.object({
    comment: joi.string().min(4).error(Error.BadRequest("The comment is incorrect")),
})

const AnswerSchema = joi.object({
    comment: joi.string().min(4).error(Error.BadRequest("The comment is incorrect")),
    commentID: joi.string().min(4).error(Error.BadRequest("The commentID is incorrect")),
})


module.exports = {
    AnswerSchema,
    CommentSchema
}