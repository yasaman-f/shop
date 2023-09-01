const { StatusCodes: HttpStatus } = require('http-status-codes')
const Error = require('http-errors')
const Controller = require('../Controller')
const { cartSchema } = require('../../validator/user/cart')
const { ProductModel } = require('../../../models/product')
const { CartModel } = require('../../../models/cart')
const { checkColor } = require('../../../utils/function')
const { stringToArray } = require('../../middleware/stringToArray')

class CartController extends Controller {
    async addCart (req, res, next){
        try {
            const userID = req.user._id
            await cartSchema.validateAsync(req.body)
            let {count, colors, productID} = req.body
            const product = await ProductModel.findOne({_id: productID})
            const Product = JSON.parse(JSON.stringify(product))
            count = parseInt(count)
            if(Product.count < count) {
                throw Error.BadRequest(`We only have ${Product.count} of this product available, the selected number is more than our inventory`)
            } else{
                Product.count = count
            }
            colors = stringToArray(colors)
            Product.colors = checkColor(colors, Product.feature.colors)
            Product.userID = userID
            Product.productID = Product._id
            const cart = await CartModel.create(Product)
            if(!cart) throw Error.InternalServerError("The product was not added to the cart")
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "The product has been successfully added to the cart"
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    CartController: new CartController()
}
