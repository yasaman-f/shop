const joi = require("@hapi/joi")

const singUpSchema = joi.object({
    username: joi.string().min(3).required().error(new Error("Username is required and must be more than 3 characters")),
    email: joi.string().lowercase().trim().email().required().error(new Error("The email is incorrect")),
    mobile: joi.string().required().pattern(/^09[0-9]{9}$/).error(new Error("The phone number is incorrect")),
    password: joi.string().min(6).max(12).required().trim().error(new Error("Password must be between 6 and 12 characters"))
}) 

const loginSchema = joi.object({
    email: joi.string().lowercase().trim().email().required().error(new Error("The email is incorrect")),
    password: joi.string().min(6).max(12).required().trim().error(new Error("Password must be between 6 and 12 characters"))
})

const forgetPasswordSchema = joi.object({
    email: joi.string().lowercase().trim().email().required().error(new Error("The email is incorrect")),
})

const checkOtpSchema = joi.object({
    code: joi.number().min(4).max(6).error(new Error("The entered code is incorrect"))
})

module.exports = {
    singUpSchema,
    loginSchema,
    forgetPasswordSchema,
    checkOtpSchema
}