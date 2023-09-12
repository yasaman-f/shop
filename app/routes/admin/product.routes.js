const { ProductController } = require("../../http/controller/admin/product")
const { checkRole } = require("../../http/middleware/entranceGuard")
const { verifyToken } = require("../../http/middleware/verifyAccess")
const { uploadImage } = require("../../utils/multer")

const router = require("express").Router()

router.post("/add", verifyToken, checkRole(["ADMIN"]), uploadImage.array("images", 10),ProductController.addProduct)
router.get("/all", ProductController.getProduct)
router.get("/getByUser/:uploader", verifyToken, checkRole(["ADMIN"]), ProductController.getProductByUserId)
router.get("/getByGroup/:group", ProductController.getProductByGroup)
router.get("/:id", ProductController.getProductById)
router.patch("/:id", verifyToken, checkRole(["ADMIN"]), uploadImage.array("images", 10), ProductController.editProduct)
router.delete("/:id", verifyToken, checkRole(["ADMIN"]),  ProductController.removeProduct)

module.exports = {
    ProductRoutes: router
}