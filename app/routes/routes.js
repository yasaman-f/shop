const { AnswerRoutes } = require("./admin/answer.routes")
const { CommentRoutes } = require("./admin/comment.routes")
const { GroupRoutes } = require("./admin/group.routes")
const { ProductRoutes } = require("./admin/product.routes")
const { RoleRoutes } = require("./admin/role.routes")
const { HomeRoutes } = require("./api/indes")
const { CartRoutes } = require("./user/cart.routes")
const { UserRoutes } = require("./user/user.routes")

const router = require("express").Router()

router.use("/", HomeRoutes)
router.use("/user", UserRoutes)
router.use("/group", GroupRoutes)
router.use("/product", ProductRoutes)
router.use("/basket", CartRoutes)
router.use("/comment", CommentRoutes)
router.use("/comment/reply", AnswerRoutes)
router.use("/role", RoleRoutes)

module.exports = {
    AllRoutes: router
}