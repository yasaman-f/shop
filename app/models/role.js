const { default: mongoose } = require('mongoose')

const role = new mongoose.Schema(
  {
  role: {type: String, required: true, unique: true},
  permission: {type: String, required: true},
  creator: {type: mongoose.Types.ObjectId, required: true},
  users: {type: [ mongoose.Types.ObjectId ], ref: "user", default: []},
  }
)

product.index({
    role: 'text',
})

const RoleModel = mongoose.model('role', role)

module.exports = {
    RoleModel
}
