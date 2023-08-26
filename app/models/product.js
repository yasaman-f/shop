const { default: mongoose } = require('mongoose')
const { CommentSchema } = require('./comment')

const product = new mongoose.Schema(
  {
  title: {type: String, required: true},
  shortDescription: {type: String, required: true},
  longDescription: {type: String, required: true},
  images: {type: [String], required: true},
  group: {type:  mongoose.Types.ObjectId, ref: "group", required: true},
  comments: {type: [CommentSchema], default: []},
  like: {type: [ mongoose.Types.ObjectId], default: []},
  deslike: {type: [ mongoose.Types.ObjectId], default: []},
  price: {type: Number, default: 0},
  discount: {type: Number, default: 0},
  count: {type: Number},
  uploader: {type: mongoose.Types.ObjectId, required: true},
  feature: {type: Object, default:{
      length: "",
      height: "",
      width: "",
      weight: "",
      colors: [],
      madeIn: ""
  }}
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
)

product.index({
  title: 'text',
})

const ProductModel = mongoose.model('product', product)

module.exports = {
  ProductModel
}
