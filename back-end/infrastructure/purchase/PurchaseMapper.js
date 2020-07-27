const Purchase = require('../../domain/purchase');

const PurchaseMapper = {
  toEntity({ dataValues }) {
    const { purchase_id, number, status, price, purchase_date, cart_id } = dataValues;
    return new Purchase({ purchase_id, status, number, price, purchase_date,  cart_id});
  },

  toDatabase(survivor) {
    const { purchase_id, number, status, price, purchase_date, cart_id } = survivor;
    return { purchase_id, number, status, price, purchase_date, cart_id };
  },
};

module.exports = PurchaseMapper;
