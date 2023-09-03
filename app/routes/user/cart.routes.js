const { CartController } = require("../../http/controller/user/cartController")
const { verifyToken } = require("../../http/middleware/verifyAccess")


const router = require("express").Router()

router.post("/add", verifyToken, CartController.addCart)
router.get("/getBasket/:userID", verifyToken, CartController.getCartByUserID)

module.exports = {
    CartRoutes: router
}