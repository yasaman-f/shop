const { checkRole } = require("../http/middleware/entranceGuard")
const { verifyToken } = require("../http/middleware/verifyAccess")
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
router.use("/group", verifyToken, checkRole(["ADMIN"]), GroupRoutes)
router.use("/product", ProductRoutes)
router.use("/basket",  verifyToken, checkRole(["ADMIN", "USER"]),CartRoutes)
router.use("/comment", verifyToken, checkRole(["ADMIN", "USER"]), CommentRoutes)
router.use("/comment/reply", verifyToken, checkRole(["ADMIN", "USER"]), AnswerRoutes)
router.use("/role", verifyToken, RoleRoutes)

module.exports = {
    AllRoutes: router
}