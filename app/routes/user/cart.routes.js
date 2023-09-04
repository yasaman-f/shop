const { CartController } = require("../../http/controller/user/cartController")
const { verifyToken } = require("../../http/middleware/verifyAccess")


const router = require("express").Router()

router.post("/add", verifyToken, CartController.addCart)
router.get("/getBasket/:userID", verifyToken, CartController.getCartByUserID)
router.patch("/edit/:id", verifyToken, CartController.editCart)

module.exports = {
    CartRoutes: router
}