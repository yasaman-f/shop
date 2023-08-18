const { UserAuthController } = require("../../http/controller/user/authController")

const router = require("express").Router()

router.post("/sign-up", UserAuthController.signUp)

module.exports = {
    UserRoutes: router
}