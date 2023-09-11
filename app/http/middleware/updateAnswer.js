const { CommentModel } = require("../../models/comment");
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

async function updateAnswer(Comment, commentID, orgCommentID, newAnswer) {
    const answers = Comment.answers
    const AnswErs = []
    for (const answer of answers) {
        try {
            if((answer._id).toString() == commentID) {
              answer.comment = newAnswer
              AnswErs.push(answer)
            } else{
              AnswErs.push(answer)
            }
            const update = await CommentModel.updateOne({_id: new ObjectId(orgCommentID)}, {$set: {answers: AnswErs}})
      } catch (error) {
        console.log(error)
      }
    }
}

async function deleteAnswer(Comment, commentID, orgCommentID, newAnswer) {
    const answers = Comment.answers
    const AnswErs = []
    for (const answer of answers) {
        try {
            if(!((answer._id).toString() == commentID)) {
              AnswErs.push(answer)
            }
            const update = await CommentModel.updateOne({_id: new ObjectId(orgCommentID)}, {$set: {answers: AnswErs}})
      } catch (error) {
        console.log(error)
      }
    }
}

module.exports = {
    updateAnswer,
    deleteAnswer
}