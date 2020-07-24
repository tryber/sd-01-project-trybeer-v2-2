const ProductMapper = require('./ProductMapper');
const Sequelize = require('sequelize');
const {
  Products,
  Carts,
  CartProducts: Cart_products,
} = require('../database/models');

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
    const allProductsCart = await Carts.findAll({
      where: { cart_id: id },
      include: [
        {
          model: Products,
          as: 'Products',
          through: { attributes: ['quantity'] },
        },
      ],
    });
    return { data: ProductRepository.formateObj(allProductsCart), id };
  }

  static async getProducts(email) {
    const { data } = await ProductRepository.getProductsInCart(email);
    const allProducts = await Products.findAll().then(res =>
      res.map(each => each.dataValues)
    );
    allProducts.forEach((product, productIndex) => {
      data.forEach(cartProducts => {
        if (product.name === cartProducts.name)
          allProducts[productIndex].quantity = cartProducts.quantity;
      });
    });
    return allProducts;
  }

  static async getProductId(name) {
    return Products.findOne({ where: { name } });
  }

  static async deleteProduct(product_id, email) {
    const cart_id = getCartId(email);
    return CartProducts.delete({
      where: { cart_id, product_id },
    });
  }

  static async updateCart(email, productName, quantity) {
    const { data, id } = await getProductsInCart(email);
    const productId = await ProductRepository.getProductId(name);

    if (data.map(each => each.name).includes(productName)) {
      if (quantity === 0)
        return CartProducts.delete({
          where: { cart_id: id, product_id: productId },
        });
      return CartProducts.update(
        { quantity },
        { cart_id: id, product_id: productId }
      );
    }
    return CartProducts.create(
      ProductMapper.toDatabase({ product_id: productId, cart_id: id, quantity })
    );
  }
}

module.exports = ProductRepository;
