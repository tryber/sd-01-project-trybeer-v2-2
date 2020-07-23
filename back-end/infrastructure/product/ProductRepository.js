const ProductMapper = require('./ProductMapper');

const { Products } = require('../database/models');

class ProductRepository {
  async getProductsInCart(email, cartId) {
    const id = cartId || (await getCartId(email));
    return {
      data: await new Promise((resolve, reject) => {
        conn.query(`CALL getCartProducts(${id})`, (err, results) => {
          if (err) return reject(err);
          return resolve(results[0]);
        });
      }),
      id,
    };
  }

  async getProducts(email) {
    const productsInCart = await getProductsInCart(email);
    const allProducts = await getAllProducts();
    allProducts.forEach((product, productIndex) => {
      productsInCart.data.forEach((cartProducts) => {
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
    if (data.map((each) => each.name).includes(productName)) {
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

  // static async createUser(obj = {}) {
  //   const newUser = await Products.create(ProductMapper.toDatabase(obj));
  //   return ProductMapper.toEntity(newUser);
  // }

  // static async login(email, password) {
  //   const user = await Products.findOne({
  //     where: {
  //       email,
  //       password,
  //     },
  //   });
  //   return ProductMapper.toEntity(user);
  // }

  // static async validateEmail(email) {
  //   const user = await Products.findOne({
  //     where: {
  //       email,
  //     },
  //   });
  //   return ProductMapper.toEntity(user);
  // }

  // static async updateNameUser(name, email) {
  //   const newUser = await Products.update({ name }, { where: { email } });
  //   return ProductMapper.toEntity(newUser);
  // }
}

module.exports = ProductRepository;
