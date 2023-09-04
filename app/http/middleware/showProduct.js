const { ProductModel } = require("../../models/product");

async function showProductInCart(products, next) {
    const Products = [];
    for (const product of products) {
      try {
        const Product = await ProductModel.findOne({_id: product.productID})
        if (Product) {
            Product.count = product.count
            Product.feature.colors = product.colors
            Products.push(Product);
        }
      } catch (error) {
        next(error)
      }
    }
    return Products;
}


module.exports = {
    showProductInCart
}