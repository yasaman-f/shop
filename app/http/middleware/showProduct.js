const { CartModel } = require("../../models/cart");
const { ProductModel } = require("../../models/product");

async function showProductInCart(products) {
    const Products = [];
    for (const product of products) {
      try {
        const Product = await ProductModel.findOne({_id: product.productID})
        if (Product) {
          Product.count = product.count
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

function SumPrice(listOfPrice) {
  let sum = 0
  for(let x of listOfPrice){
    sum = sum + x
  }
  return sum
}

async function showFactureInCart(products) {
    const Price = [];
    for (const product of products) {
      try {
        const Product = await ProductModel.findOne({_id: product.productID})
        Product.count = product.count
        let {count, price} = Product
        count = parseInt(count)
        price = parseInt(price)
        const TheFinalPrice = count * price
        Price.push(TheFinalPrice)
      } catch (error) {
        console.log(error)
      }
    }
    console.log(Price);

    const facture = SumPrice(Price)
    return facture;
}


module.exports = {
    showProductInCart,
    showFactureInCart
}