const { ProductController } = require("../../http/controller/admin/product")
const { verifyToken } = require("../../http/middleware/verifyAccess")
const { uploadImage } = require("../../utils/multer")

const router = require("express").Router()

router.post("/add", verifyToken, uploadImage.array("images", 10),ProductController.addProduct)
router.get("/all", ProductController.getProduct)
router.get("/:group", ProductController.getProductByGroup)
router.get("/:uploader", verifyToken, ProductController.getProductByUserId)
router.get("/:id", ProductController.getProductById)
router.patch("/:id", verifyToken, uploadImage.array("images", 10), ProductController.editProduct)
router.delete("/:id", verifyToken,  ProductController.removeProduct)

module.exports = {
    ProductRoutes: router
}