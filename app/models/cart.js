const { default: mongoose } = require('mongoose')

const cart = new mongoose.Schema(
  {
  productID: {type:  mongoose.Types.ObjectId, ref: "product", required: true},
  userID: {type:  mongoose.Types.ObjectId, ref: "user", required: true},
  count: {type: Number, required: true},
  colors: {type: [String], require: true},
  facture: {type: Number, default: 0}
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
)


const CartModel = mongoose.model('cart', cart)

module.exports = {
    CartModel
}
