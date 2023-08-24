const { default: mongoose } = require("mongoose");

const group = new mongoose.Schema({
    title: {type: String, required: true},
    userID: {type: mongoose.Types.ObjectId, required: true},
    description: {type: String, default: ""}
},{
    __v: false,
    toJSON: {
        virtuals: true
    }
});



const GroupModel = mongoose.model('group', group)

module.exports = {
    GroupModel 
}