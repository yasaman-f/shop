const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    product: {type: mongoose.Types.ObjectId, ref: "comment", required: true},
    comment: {type: String, required: true},
    createdAt: {type: Date, required: new Date().getTime()}
})

module.exports = {
    CommentSchema
}