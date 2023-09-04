const { CartModel } = require("../../models/cart");
const { ProductModel } = require("../../models/product");

async function showProductInCart(products, next) {
    const Products = [];
    for (const product of products) {
      try {
        const Product = await ProductModel.findOne({_id: product.productID})
        if (Product) {
          Product.count = product.count
          console.log(Product.count);
          if(Product.count == 0 || !Product.count){
            const Delete = await CartModel.deleteOne({_id: product.productID})
          }
            Product.feature.colors = product.colors
            Products.push(Product);
        }
      } catch (error) {
        console.log(error)
      }
    }
    return Products;
}


module.exports = {
    showProductInCart
}