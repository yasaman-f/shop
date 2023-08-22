const { GroupController } = require("../../http/controller/admin/group")
const { verifyToken } = require("../../http/middleware/verifyAccess")

const router = require("express").Router()

router.post("/add", verifyToken,GroupController.addGroup)
router.get("/get",GroupController.getGroup)
router.patch("/edit/:id", verifyToken,GroupController.editGroup)
router.delete("/remove/:id", verifyToken,GroupController.removeGroup)

module.exports = {
    GroupRoutes: router
}