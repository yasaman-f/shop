const { CartController } = require("../../http/controller/user/cartController")
const { verifyToken } = require("../../http/middleware/verifyAccess")


const router = require("express").Router()

router.post("/add", verifyToken,CartController.addCart)

module.exports = {
    CartRoutes: router
}