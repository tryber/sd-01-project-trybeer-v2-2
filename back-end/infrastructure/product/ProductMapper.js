const Products = require('../../domain/product');

const ProductMapper = {
  toEntity({ dataValues }) {
    const { product_id, name, price } = dataValues;
    return new Products({ product_id, name, price });
  },

  toDatabase(survivor) {
    const { product_id, cart_id, quantity } = survivor;
    return { product_id, cart_id, quantity };
  },
};

module.exports = ProductMapper;
