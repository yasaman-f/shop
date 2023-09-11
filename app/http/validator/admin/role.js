const joi = require("@hapi/joi")
const Error = require("http-errors")


const roleSchema = joi.object({
    role: joi.string().min(3).max(10).error(Error.BadRequest("The role is incorrect")),
    permission: joi.string().min(10).error(Error.BadRequest("The permission is incorrect")),
})

const addRoleSchema = joi.object({
    role: joi.string().min(3).max(10).error(Error.BadRequest("The role is incorrect")),
    permission: joi.string().min(10).error(Error.BadRequest("The permission is incorrect")),
    userID: joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(Error.BadRequest("The userID is incorrect")),
})


module.exports = {
    roleSchema
}