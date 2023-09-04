const joi = require("@hapi/joi")
const Error = require("http-errors")


const cartSchema = joi.object({
    productID: joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(Error.BadRequest("The productID is incorrect")),
    count: joi.number().error(Error.BadRequest("The count is incorrect")),
    colors: joi.string().error(Error.BadRequest("The color is incorrect")),
})


const editSchema = joi.object({
    count: joi.number().error(Error.BadRequest("The count is incorrect")),
    colors: joi.string().error(Error.BadRequest("The color is incorrect")),
})

module.exports = {
    cartSchema,
    editSchema
}