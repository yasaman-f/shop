const { HomeRoutes } = require("./api/indes")
const { UserRoutes } = require("./user/user.routes")

const router = require("express").Router()

router.use("/", HomeRoutes)
router.use("/user", UserRoutes)

module.exports = {
    AllRoutes: router
}