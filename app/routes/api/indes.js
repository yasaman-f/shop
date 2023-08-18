const HomeController = require("../../http/controller/api/HomeController")

const router = require("express").Router()

router.get("/", HomeController.Controller)

module.exports = {
    HomeRoutes: router
}