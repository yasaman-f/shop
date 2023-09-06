const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    userID : {type : mongoose.Types.ObjectId, ref: "user", required: true},
    productID: {type: mongoose.Types.ObjectId, ref: "product", required: true},
    comment: {type: String, required: true},
    show: {type: Boolean, required: true, default: false},
    parentId: { type: [mongoose.Types.ObjectId], defaut: [] },
    childrenId: { type: [mongoose.Types.ObjectId], default: [] }
}, {
    timestamps : {createdAt: true}
})

const CommentSchema = new mongoose.Schema({
    userID : {type : mongoose.Types.ObjectId, ref: "user", required: true},
    productID: {type: mongoose.Types.ObjectId, ref: "product", required: true},
    comment: {type: String, required: true},
    show: {type: Boolean, required: true, default: false},
    isParent: { type: Boolean },
    parent: { type: mongoose.Types.ObjectId },
    answers : {type: [AnswerSchema], default: []},
}, {
    timestamps : {createdAt: true}
})

module.exports = {
    CommentSchema
}

	
