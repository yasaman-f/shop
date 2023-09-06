const { ProductController } = require("../../http/controller/admin/product")
const HomeController = require("../../http/controller/api/HomeController")

const router = require("express").Router()

router.get("/", ProductController.getProduct)

module.exports = {
    HomeRoutes: router
}