const { default: mongoose } = require('mongoose')

const user = new mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String, lowercase: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    otp: { type: Object, default: { code: 0, expire: 0 } },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    roles: { type: [String], default: ['USER'] }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
)

user.index({
  firstname: 'text',
  lastname: 'text',
  username: 'text',
  email: 'text',
  mobile: 'text'
})

const UserModel = mongoose.model('user', user)

module.exports = {
  UserModel
}
