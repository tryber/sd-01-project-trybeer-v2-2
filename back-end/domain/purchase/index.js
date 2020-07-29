const { attributes } = require('structure');

const Purchase = attributes({
  Purchase_id: Number,
  number: {
    type: Number,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  price: {
    type: Float32Array,
    required: true,
  },
  cart_id: {
    type: Number,
    required: true,
  },
  purchase_date: {
    type: Date,
    required: true,
  },
})(class Purchase {});

module.exports = Purchase;
