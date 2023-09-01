const { GroupRoutes } = require("./admin/group.routes")
const { ProductRoutes } = require("./admin/product.routes")
const { HomeRoutes } = require("./api/indes")
const { CartRoutes } = require("./user/cart.routes")
const { UserRoutes } = require("./user/user.routes")

const router = require("express").Router()

router.use("/", HomeRoutes)
router.use("/user", UserRoutes)
router.use("/group", GroupRoutes)
router.use("/product", ProductRoutes)
router.use("/basket", CartRoutes)

module.exports = {
    AllRoutes: router
}