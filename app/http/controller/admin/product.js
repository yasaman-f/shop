const { StatusCodes: HttpStatus } = require('http-status-codes')
const Error = require('http-errors')
const path = require('path')
const Controller = require('../Controller')
const { RemoveExcessData, putArrayOfImage, setFeture } = require('../../../utils/function')
const { productSchema } = require('../../validator/admin/product')
const { ProductModel } = require('../../../models/product')
const { stringToArray } = require('../../middleware/stringToArray')

class ProductController extends Controller {
    async addProduct (req, res, next){
        try {
            await productSchema.validateAsync(req.body)
            let { title, shortDescription, longDescription, group, price, discount, count, weight, length, height, width, colors, madeIn, filename, fileUploadPath } = req.body
            const images = putArrayOfImage(req?.files || [], req.body.fileUploadPath)
            
            const data = req.body
            const extraData = ['', ' ', 0, null, undefined, NaN, [], {}]
            data.feature = setFeture(req.body)
            data.uploader = req.user._id
            data.images = images
            RemoveExcessData(data, extraData)
            
            const product = await ProductModel.findOne({title})
            if(product) throw Error.BadRequest("You have already added the product")
            const create = await ProductModel.create(data)
            
            return res.status(HttpStatus.CREATED).json({
                data: {
                    create
                } 
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = {
    ProductController: new ProductController()
}
