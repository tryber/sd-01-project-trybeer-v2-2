const Products = require('../../domain/product');

const ProductMapper = {
  toEntity({ dataValues }) {
    const { product_id, name, price } = dataValues;
    return new Products({ product_id, name, price });
  },

  toDatabase(survivor) {
    const { name, price } = survivor;
    return { name, price };
  },
};

module.exports = ProductMapper;
