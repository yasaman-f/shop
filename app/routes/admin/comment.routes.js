const { CommentController } = require("../../http/controller/admin/commentController")
const { verifyToken } = require("../../http/middleware/verifyAccess")

const router = require("express").Router()

router.post("/add/:productID", verifyToken, CommentController.addComment)
router.post("/add-answer/:productID", verifyToken, CommentController.addAnswerComment)

module.exports = {
    CommentRoutes: router
}