const { CommentController } = require("../../http/controller/admin/commentController")
const { verifyToken } = require("../../http/middleware/verifyAccess")

const router = require("express").Router()

router.post("/add/:productID", verifyToken, CommentController.addComment)
router.patch("/edit/:commentID", verifyToken, CommentController.editComment)

module.exports = {
    CommentRoutes: router
}