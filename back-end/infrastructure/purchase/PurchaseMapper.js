const Purchase = require('../../domain/purchase');

const PurchaseMapper = {
  toEntity({ dataValues }) {
    const {
      purchase_id,
      street,
      number,
      status,
      price,
      purchase_date,
      cart_id,
    } = dataValues;
    return new Purchase({
      purchase_id,
      street,
      status,
      number,
      price,
      purchase_date,
      cart_id,
    });
  },

  toDatabase(survivor) {
    const {
      street,
      number,
      status,
      price,
      purchaseDate: purchase_date,
      cartId: cart_id,
    } = survivor;
    return { street, number, status, price, purchase_date, cart_id };
  },
};

module.exports = PurchaseMapper;
