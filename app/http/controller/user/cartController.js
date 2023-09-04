const { StatusCodes: HttpStatus } = require('http-status-codes')
const Error = require('http-errors')
const Controller = require('../Controller')
const { cartSchema, editSchema } = require('../../validator/user/cart')
const { ProductModel } = require('../../../models/product')
const { CartModel } = require('../../../models/cart')
const { checkColor, RemoveExcessData } = require('../../../utils/function')
const { stringToArray } = require('../../middleware/stringToArray')
const { showProductInCart } = require('../../middleware/showProduct')

class CartController extends Controller {
  async addCart (req, res, next) {
    try {
      const userID = req.user._id
      await cartSchema.validateAsync(req.body)
      let { count, colors, productID } = req.body
      const product = await ProductModel.findOne({ _id: productID })
      const Product = JSON.parse(JSON.stringify(product))
      count = parseInt(count)
      if (Product.count < count) {
        throw Error.BadRequest(
          `We only have ${Product.count} of this product available, the selected number is more than our inventory`
        )
      } else {
        Product.count = count
      }
      colors = stringToArray(colors)
      Product.colors = checkColor(colors, Product.feature.colors)
      Product.userID = userID
      Product.productID = Product._id
      const cart = await CartModel.create(Product)
      if (!cart)
        throw Error.InternalServerError('The product was not added to the cart')
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: 'The product has been successfully added to the cart'
        }
      })
    } catch (error) {
      next(error)
    }
  }
  async getCartByUserID (req, res, next) {
    try {
        const userID = req.params
        const product = await CartModel.find(userID)
        if(!product) {
            throw Error.NotFound("Your shopping cart is empty")
        } else{
            const products = await showProductInCart(product)
            res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    products
                }
            })
        }
    } catch (error) {
        next(error)
    }
  }
  async editCart (req, res, next) {
    try {
      await editSchema.validateAsync(req.body)
      const { id } = req.params
      let {count, colors} = req.body
      const cart = await CartModel.findOne({_id: id})
      const product = await ProductModel.findOne({ _id: cart.productID })
      let Product = JSON.parse(JSON.stringify(product))
      count = parseInt(count)
      if (Product.count < count) {
        throw Error.BadRequest(
          `We only have ${Product.count} of this product available, the selected number is more than our inventory`
        )
      } else {
        Product.count = count
      }
      colors = stringToArray(colors)
      Product.colors = checkColor(colors, Product.feature.colors)
      Product = RemoveExcessData(Product)
      console.log(Product);
      const update = await CartModel.updateOne({_id: id}, {$set: Product})
      if (!update.modifiedCount) throw Error.InternalServerError("Failed to update shopping cart")
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: 'The cart was update successfully'
        }})
    } catch (error) {
      next(error)
    }
  }
  async removeCart (req, res, next){
    try {
      const { id } = req.params
      const cart = await CartModel.findOne({_id: id})
      if (!cart) throw Error.NotFound("This product was not found in your shopping cart")
      const Delete = await CartModel.deleteOne({_id: id})
        if(!Delete.deletedCount) throw Error.InternalServerError("Removing this product from the shopping cart was not successful")
        return res.status(HttpStatus.OK).json({
            StatusCode: HttpStatus.OK,
            data: {
              message: 'This product has been successfully removed from the shopping cart'
            }})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  CartController: new CartController()
}
