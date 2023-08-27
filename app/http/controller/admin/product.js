const { StatusCodes: HttpStatus } = require('http-status-codes')
const Error = require('http-errors')
const path = require('path')
const Controller = require('../Controller')
const {
  RemoveExcessData,
  putArrayOfImage,
  setFeture
} = require('../../../utils/function')
const { productSchema, findById, findByUserId, findByGroup } = require('../../validator/admin/product')
const { ProductModel } = require('../../../models/product')
const { stringToArray } = require('../../middleware/stringToArray')

class ProductController extends Controller {
  async addProduct (req, res, next) {
    try {
      await productSchema.validateAsync(req.body)
      let {
        title,
        shortDescription,
        longDescription,
        group,
        price,
        discount,
        count,
        weight,
        length,
        height,
        width,
        colors,
        madeIn,
        filename,
        fileUploadPath
      } = req.body
      const images = putArrayOfImage(req?.files || [], req.body.fileUploadPath)

      const data = req.body
      const extraData = ['', ' ', 0, null, undefined, NaN, [], {}]
      data.feature = setFeture(req.body)
      data.uploader = req.user._id
      data.images = images
      RemoveExcessData(data)

      const product = await ProductModel.findOne({ title })
      if (product) throw Error.BadRequest('You have already added the product')
      const create = await ProductModel.create(data)

      return res.status(HttpStatus.CREATED).json({
        StatusCode: HttpStatus.CREATED,
        data: {
          message: 'The product was created successfully'
        }
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  async getProduct (req, res, next) {
    try {
      const { search } = req.query
      const dataBase = {}
      if (search) dataBase['$text'] = { $search: search }
      const product = await ProductModel.find(dataBase)
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          product
        }
      })
    } catch (error) {
      next(error)
    }
  }
  async getProductById (req, res, next){
    try {
        const {id} = req.params
        await findById.validateAsync({id})
        const find = await ProductModel.findById(id)
        if(!find) throw Error.NotFound("No product found")
        return res.status(HttpStatus.OK).json({
            StatusCode: HttpStatus.OK,
            data: {
              find
            }})
    } catch (error) {
        next(error)
    }
  }
  async getProductByUserId (req, res, next){
    try {
        const {uploader} = req.params
        await findByUserId.validateAsync({uploader})
        const find = await ProductModel.find({uploader})
        if(!find) throw Error.NotFound("No product found")
        return res.status(HttpStatus.OK).json({
            StatusCode: HttpStatus.OK,
            data: {
              find
            }})
    } catch (error) {
        next(error)
    }
  }
  async getProductByGroup (req, res, next){
    try {
        const {group} = req.params
        await findByGroup.validateAsync({group})
        const find = await ProductModel.find({group})
        if(!find) throw Error.NotFound("No product found")
        return res.status(HttpStatus.OK).json({
            StatusCode: HttpStatus.OK,
            data: {
              find
            }})
    } catch (error) {
        next(error)
    }
  }
  async editProduct (req, res, next){
    try {
        const { id } = req.params
        const product = await ProductModel.findOne({_id : id})
        let data = req.body
        data.images = putArrayOfImage(req?.files || [], req.body.fileUploadPath)
        data.feature = setFeture(req.body)
        const BlackList = ["comments", "like", "deslike"]
        data = RemoveExcessData(data, BlackList)
        const update = await ProductModel.updateOne({_id: product._id}, {$set: data})
        if(update.modifiedCount == 0 ) throw Error.NotFound("Update failed")
        return res.status(HttpStatus.OK).json({
            StatusCode: HttpStatus.OK,
            data: {
              message: 'The product was update successfully'
            }})
    } catch (error) {
        next(error)
    }
  }
  async removeProduct (req, res, next){
    try {
        const { id } = req.params
        const product = await ProductModel.findOne({_id: id})
        if(!product) throw Error.NotFound("This product ID was not found")
        const Delete = await ProductModel.deleteOne({_id: id})
        if(!Delete.deletedCount) throw Error.InternalServerError("Product removal was successful")
        return res.status(HttpStatus.OK).json({
            StatusCode: HttpStatus.OK,
            data: {
              message: 'The product was delete successfully'
            }})
    } catch (error) {
        next(error)
    }
  }
}

module.exports = {
  ProductController: new ProductController()
}
