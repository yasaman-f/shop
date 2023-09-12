const { CartController } = require("../../http/controller/user/cartController")
const { verifyToken } = require("../../http/middleware/verifyAccess")


const router = require("express").Router()

router.post("/add", CartController.addCart)
router.get("/getBasket/:userID", CartController.getCartByUserID)
router.patch("/edit/:id", CartController.editCart)
router.delete("/remove/:id", CartController.removeCart)

module.exports = {
    CartRoutes: router
}