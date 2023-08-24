const joi = require("@hapi/joi")

const groupSchema = joi.object({
    title: joi.string().min(4).max(20).required().error(new Error("Please enter the title and the title must be between 4 and 20 characters")),
    description: joi.string().error(new Error("The description is incorrect"))
})


module.exports = {
    groupSchema
}