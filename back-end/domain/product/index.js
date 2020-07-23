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
  },
})(class Products {});

module.exports = Products;
