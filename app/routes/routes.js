const { HomeRoutes } = require("./api/indes")

const router = require("express").Router()

router.use("/", HomeRoutes)

module.exports = {
    AllRoutes: router
}