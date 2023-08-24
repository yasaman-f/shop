const { StatusCodes: HttpStatus } = require('http-status-codes')
const Error = require('http-errors')
const Controller = require('../Controller')
const { RemoveExcessData, putArrayOfImage, setFeture } = require('../../../utils/function')
const { productSchema } = require('../../validator/admin/product')
const { ProductModel } = require('../../../models/product')
const { stringToArray } = require('../../middleware/stringToArray')

class ProductController extends Controller {
    async addProduct (req, res, next){
        try {
            await productSchema.validateAsync(req.body)
            req.body.images = putArrayOfImage(req?.files || [], req.body.fileUploadPath)
            const images = req?.body?.images
            
            const { title, shortDescription, longDescription, group, price, discount, count, weight, length, height, width, colors, madeIn, filename, fileUploadPath } = req.body
            colors = stringToArray(colors)
            const uploader = user._id
            
            let feature = setFeture(req.body)
            
            const data = req.body
            const extraData = ['', ' ', 0, null, undefined, NaN]
            RemoveExcessData(data, extraData)
            
            const product = await ProductModel.findOne({title})
            if(product.title && product.uploader) throw Error.BadRequest("You have already added the product")
            console.log("hello");
            
            const create = await ProductModel.create({data})
            
            return res.status(HttpStatus.CREATED).json({
                data: {
                    create
                }
            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    ProductController: new ProductController()
}
