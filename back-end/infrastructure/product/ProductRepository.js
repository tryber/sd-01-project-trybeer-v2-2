const ProductMapper = require('./ProductMapper');
const Sequelize = require('sequelize');
const {
  Products,
  Carts,
  Cart_products: CartProducts,
} = require('../database/models');

class ProductRepository {
  static formateObj(obj) {
    const values = obj[0].dataValues.Products.map(each => each.dataValues);
    values.forEach((value) => {
      const newObject = {
        ...value,
        quantity: value.Cart_products.dataValues.quantity,
      };
      return newObject;
    });
    const newValue = values.map(({ product_id, name, price, quantity }) => ({
      product_id,
      name,
      price,
      quantity,
    }));
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
      res.map(each => each.dataValues),
    );
    allProducts.forEach((product, productIndex) => {
      data.forEach((cartProducts) => {
        if (product.name === cartProducts.name)
          allProducts[productIndex].quantity = cartProducts.quantity;
      });
    });
    return allProducts;
  }

  static async getProductId(name) {
    const id = await Products.findOne({ where: { name } });
    return id.dataValues.product_id;
  }

  static async deleteProduct(name, email) {
    const cartId = await ProductRepository.getCartId(email);
    const productId = await ProductRepository.getProductId(name);
    return CartProducts.destroy({
      where: { cart_id: cartId, product_id: productId },
    });
  }

  static async updateCart(email, productName, quantity) {
    const { data, id } = await ProductRepository.getProductsInCart(email);
    const productId = await ProductRepository.getProductId(productName);
    if (data.map(each => each.name).includes(productName)) {
      if (quantity === 0)
        return CartProducts.destroy({
          where: { cart_id: id, product_id: productId },
        });
      return CartProducts.update(
        { quantity },
        { where: { cart_id: id, product_id: productId } },
      );
    }
    return CartProducts.create(
      ProductMapper.toDatabase({ product_id: productId, cart_id: id, quantity }),
    );
  }
}

module.exports = ProductRepository;
