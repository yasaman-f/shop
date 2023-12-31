const { AnswerController } = require("../../http/controller/admin/answerController")
const { verifyToken } = require("../../http/middleware/verifyAccess")

const router = require("express").Router()

router.post("/add/:commentID", AnswerController.addAnswer)
router.patch("/edit/:answerID", AnswerController.editComment)

module.exports = {
    AnswerRoutes: router
}