const { UserAuthController } = require("../../http/controller/user/authController")

const router = require("express").Router()

router.post("/sign-up", UserAuthController.signUp)
router.post("/login", UserAuthController.login)

module.exports = {
    UserRoutes: router
}