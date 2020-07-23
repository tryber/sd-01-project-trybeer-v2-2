const ProductMapper = require('./ProductMapper');

const { Products, Cart_products } = require('../database/models');

Products.belongsTo(Cart_products, { foreignKey: 'cart_id' });
Cart_products.hasMany(Products, { foreignKey: 'cart_id' });

class ProductRepository {
  static async getProductsInCart(email, cartId) {
    const id = cartId || 1;
    const produ = await Cart_products.findAll({
      include: [
        {
          model: Products,
          required: true,
          // where: { cart_id: id },
        },
      ],
    });
    console.log(produ);
  }

  async getProducts(email) {
    const productsInCart = await this.getProductsInCart(email);
    const allProducts = await Products.findAll();
    allProducts.forEach((product, productIndex) => {
      productsInCart.data.forEach(cartProducts => {
        if (product.name === cartProducts.name)
          allProducts[productIndex].quantity = cartProducts.quantity;
      });
    });
    return allProducts;
  }

  static async getAllProducts() {
    const products = await Products.findAll();
    return getProducts();
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

module.exports = ProductRepository;
