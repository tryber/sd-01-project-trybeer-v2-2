const ProductMapper = require('./ProductMapper');

const { Users: Products } = require('../database/models');

class ProductRepository {
  static async createUser(obj = {}) {
    const newUser = await Products.create(ProductMapper.toDatabase(obj));
    return ProductMapper.toEntity(newUser);
  }

  static async login(email, password) {
    const user = await Products.findOne({
      where: {
        email,
        password,
      },
    });
    return ProductMapper.toEntity(user);
  }

  static async validateEmail(email) {
    const user = await Products.findOne({
      where: {
        email,
      },
    });
    return ProductMapper.toEntity(user);
  }
  
  static async updateNameUser(name, email) {
    const newUser = await Products.update({ name }, { where: { email } });
    return ProductMapper.toEntity(newUser);
  }
}

module.exports = ProductRepository;
