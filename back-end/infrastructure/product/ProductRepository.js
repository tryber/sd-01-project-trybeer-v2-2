const ProductMapper = require('./ProductMapper');
const Sequelize = require('sequelize');
const { Products, Carts, Users } = require('../database/models');

class ProductRepository {
  static formateObj(obj) {
    const values = obj[0].dataValues.Products.map(each => each.dataValues);
    values.forEach(value => {
      value.quantity = value.Cart_products.dataValues.quantity;
    });
    const newValue = values.map(({ product_id, name, price, quantity }) => {
      return { product_id, name, price, quantity };
    });
    return newValue;
  }

  static async getCartId(email) {
    const sequelize = new Sequelize('trybeer', 'root', 'password', {
      host: 'localhost',
      dialect: 'mysql',
    });

    const id = await sequelize.query(`SELECT getUserCart("${email}")`);
    return id[0][0][`getUserCart("${email}")`];
  }

  static async getProductsInCart(email, cartId) {
    const id = cartId || (await ProductRepository.getCartId(email));
    const cartProducts = await Carts.findAll({
      where: { cart_id: id },
      include: [
        {
          model: Products,
          as: 'Products',
          through: { attributes: ['quantity'] },
        },
      ],
    });
    return ProductRepository.formateObj(cartProducts);
  }

  static async getProducts(email) {
    const productsInCart = await ProductRepository.getProductsInCart(email);
    const allProducts = await Products.findAll().then(res =>
      res.map(each => each.dataValues)
    );
    allProducts.forEach((product, productIndex) => {
      productsInCart.forEach(cartProducts => {
        if (product.name === cartProducts.name)
          allProducts[productIndex].quantity = cartProducts.quantity;
      });
    });
    return allProducts;
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
