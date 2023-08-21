const { GroupController } = require("../../http/controller/admin/group")
const { verifyToken } = require("../../http/middleware/verifyAccess")

const router = require("express").Router()

router.post("/add", verifyToken,GroupController.addGroup)

module.exports = {
    GroupRoutes: router
}