const joi = require("@hapi/joi")
const Error = require("http-errors")


const productSchema = joi.object({
    title: joi.string().min(3).max(30).error(Error.BadRequest("The title is incorrect")),
    shortDescription: joi.string().error(Error.BadRequest("The shortDescription is incorrect")),
    longDescription: joi.string().error(Error.BadRequest("The longDescription is incorrect")),
    group: joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(Error.BadRequest("The group is incorrect")),
    price: joi.number().error(Error.BadRequest("The price is incorrect")),
    discount: joi.number().error(Error.BadRequest("The discount is incorrect")),
    count: joi.number().error(Error.BadRequest("The count is incorrect")),
    weight: joi.number().empty("").error(Error.BadRequest("The weight is incorrect")),
    length: joi.number().empty("").error(Error.BadRequest("The length is incorrect")),
    height: joi.number().empty("").error(Error.BadRequest("The height is incorrect")),
    width: joi.number().empty("").error(Error.BadRequest("The width is incorrect")),
    colors: joi.string().error(Error.BadRequest("The color is incorrect")),
    madeIn: joi.string().error(Error.BadRequest("The madeIn is incorrect")),
    filename: joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(Error.BadRequest("The filename incorrect")),
    fileUploadPath : joi.allow(),
    images : joi.allow(),
})
const productEdit = joi.object({
    title: joi.string().min(3).max(30).error(Error.BadRequest("The title is incorrect")),
    shortDescription: joi.string().error(Error.BadRequest("The shortDescription is incorrect")),
    longDescription: joi.string().error(Error.BadRequest("The longDescription is incorrect")),
    group: joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(Error.BadRequest("The group is incorrect")),
    price: joi.number().error(Error.BadRequest("The price is incorrect")),
    discount: joi.number().error(Error.BadRequest("The discount is incorrect")),
    count: joi.number().error(Error.BadRequest("The count is incorrect")),
    weight: joi.number().empty("").error(Error.BadRequest("The weight is incorrect")),
    length: joi.number().empty("").error(Error.BadRequest("The length is incorrect")),
    height: joi.number().empty("").error(Error.BadRequest("The height is incorrect")),
    width: joi.number().empty("").error(Error.BadRequest("The width is incorrect")),
    colors: joi.string().error(Error.BadRequest("The color is incorrect")),
    madeIn: joi.string().error(Error.BadRequest("The madeIn is incorrect")),
    filename: joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(Error.BadRequest("The filename incorrect")),
    fileUploadPath : joi.allow(),
    images : joi.allow(),
})

const findById = joi.object({
    id: joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(Error.BadRequest("The id is incorrect")),
})

const findByUserId = joi.object({
    uploader: joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(Error.BadRequest("The uploader is incorrect")),
})

const findByGroup = joi.object({
    group: joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(Error.BadRequest("The group is incorrect")),
})

module.exports = {
    productSchema,
    findById,
    findByUserId,
    findByGroup
}