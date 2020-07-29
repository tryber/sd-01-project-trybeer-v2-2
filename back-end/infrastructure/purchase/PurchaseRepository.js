const PurchaseMapper = require('./PurchaseMapper');

const { Purchases, Carts, Users } = require('../database/models');

// const { street, number, finished, cartId, price, purchaseDate } = obj;
class PurchaseRepository {
  static async create(obj = {}) {
    const order = await Purchases.create(PurchaseMapper.toDatabase(obj));
    return PurchaseMapper.toEntity(order);
  }

  static async getAll() {
    const purchases = await Purchases.findAll();
    return purchases.map(({ dataValues }) => dataValues);
  }

  static async getUserOrders(email) {
    const carts = await Carts.findAll({
      include: [
        {
          model: Purchases,
          as: 'Purchase',
        },
        {
          model: Users,
          as: 'User',
          where: { email },
        },
      ],
    });
    const purchases = carts
      .map(({ dataValues }) => dataValues)
      .filter(values => values.Purchase)
      .map(({ Purchase }) => Purchase.dataValues);
    return purchases;
  }

  static async getDetails(id) {
    const details = await Purchases.findAll({
      where: { purchase_id: id },
    });
    return details[0].dataValues;
  }

  static async updateState(orderId, status) {
    const order = await PurchaseRepository.getDetails(orderId);
    if (!order) return { message: 'Pedido inexistente' };
    const orders = await Purchases.update(
      { status },
      {
        where: { purchase_id: orderId },
      },
    );
    return orders;
  }
}

module.exports = PurchaseRepository;
