const { CommentController } = require("../../http/controller/admin/commentController")
const { verifyToken } = require("../../http/middleware/verifyAccess")

const router = require("express").Router()

router.post("/add/:productID", CommentController.addComment)
router.patch("/edit/:commentID", CommentController.editComment)

module.exports = {
    CommentRoutes: router
}