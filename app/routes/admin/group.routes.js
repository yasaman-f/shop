const { GroupController } = require("../../http/controller/admin/group")
const { verifyToken } = require("../../http/middleware/verifyAccess")

const router = require("express").Router()

router.post("/add", verifyToken,GroupController.addGroup)
router.get("/get", verifyToken,GroupController.getGroup)

module.exports = {
    GroupRoutes: router
}