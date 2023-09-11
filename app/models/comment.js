const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    userID : {type : mongoose.Types.ObjectId, required: true},
    productID: {type: mongoose.Types.ObjectId, required: true},
    comment: {type: String, required: true},
    show: {type: Boolean, required: true, default: true},
    parentId: { type: [mongoose.Types.ObjectId], defaut: [] },
    answers: { type: [mongoose.Types.ObjectId], default: [] },
}, {
    timestamps : {
        createdAt: true
    }
})

const comment = new mongoose.Schema({
    userID : {type : mongoose.Types.ObjectId, required: true},
    productID: {type: mongoose.Types.ObjectId, required: true},
    comment: {type: String, required: true},
    show: {type: Boolean, required: true, default: true},
    isParent: {type: Boolean},
    answers : {type: [AnswerSchema], default: []},
}, {
    timestamps: {
        createdAt: true
    },
    __v: false
})


const CommentModel = mongoose.model('comment', comment)
const AnswerModel = mongoose.model('answer', AnswerSchema)


module.exports = {
    CommentModel,
    AnswerModel
}

	
