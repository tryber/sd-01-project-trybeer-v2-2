const { getProducts, getProductsInCart, deleteBuy, updateBuy, createBuy, getCartId } = require('../service/getProducts');

class Products {
  constructor(productId, name, price) {
    this.productId = productId;
    this.name = name;
    this.price = price;
  }

  static async getAllProducts(email) {
    return getProducts(email);
  }

  static async updateCart(email, productName, quantity) {
    const { data, id } = await getProductsInCart(email);
    if (data.map(each => each.name).includes(productName)) {
      if (quantity === 0) return deleteBuy(productName, id);
      return updateBuy(productName, quantity, id);
    }
    return createBuy(productName, id);
  }

  static async getCart(email, cartId) {
    return getProductsInCart(email, cartId);
  }

  static async deleteProduct(name, email) {
    const id = await getCartId(email);
    return deleteBuy(name, id);
  }
}

module.exports = Products;
