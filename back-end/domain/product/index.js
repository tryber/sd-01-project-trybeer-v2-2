const { attributes } = require('structure');

const Products = attributes({
  product_id: Number,
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Float32Array,
    required: true,
  }
})(
  class Products {
    getAllProducts() {
      const { product_id, name, price } = this;
      return { product_id, name, price };
    }
  }
);

module.exports = Products;
