const { RoleController } = require("../../http/controller/admin/roleController")
const { verifyToken } = require("../../http/middleware/verifyAccess")

const router = require("express").Router()

router.post("/add", RoleController.addRole)
router.get("/listOfRole", RoleController.getRole)
router.post("/giveRoleToUser", RoleController.addUserToRole)
router.patch("/edit/:roleID", RoleController.editRole)
router.delete("/delete/:roleID", RoleController.removeRole)

module.exports = {
    RoleRoutes: router
}