const { RoleController } = require("../../http/controller/admin/roleController")
const { verifyToken } = require("../../http/middleware/verifyAccess")

const router = require("express").Router()

router.post("/add", verifyToken, RoleController.addRole)
router.get("/listOfRole", verifyToken, RoleController.getRole)
router.post("/giveRoleToUser", verifyToken, RoleController.addUserToRole)

module.exports = {
    RoleRoutes: router
}