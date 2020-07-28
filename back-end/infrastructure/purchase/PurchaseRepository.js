const PurchaseMapper = require('./PurchaseMapper');

const { Purchases, Carts } = require('../database/models');

// const { street, number, finished, cartId, price, purchaseDate } = obj;
class PurchaseRepository {
  static async create(obj = {}) {
    const order = await Purchases.create(PurchaseMapper.toDatabase(obj));
    return PurchaseMapper.toEntity(order);
  }

  static async getAll() {
    const purchases = await Purchases.findAll();
    return purchases.map(PurchaseMapper.toEntity);
  }

  // SELECT purchase_id, street, number, finished, price, purchase_date FROM purchase AS p
  // INNER JOIN cart AS c ON c.cart_id = p.cart_id
  // INNER JOIN user AS u ON u.user_id = c.user_id
  // WHERE u.email = '${email}';

  // where: { cart_id: id },
  //     include: [
  //       {
  //         model: Products,
  //         as: 'Products',
  //         through: { attributes: ['quantity'] },
  //       },
  //     ],

  static async getUserOrders(email) {
    const carts = await Carts.findAll({
      where: { email: email },
      include: [
        {
          model: Purchases,
          as: 'Purchases',
          where: { cart_id: Purchases.cart_id },
        },
        {
          model: Users,
          as: 'Users',
          where: { user_id: Users.user_id },
        },
      ],
    });
    return carts.map(PurchaseMapper.toEntity);
    // const query = `SELECT purchase_id, street, number, finished, price, purchase_date FROM purchase AS p
    // INNER JOIN cart AS c ON c.cart_id = p.cart_id
    // INNER JOIN user AS u ON u.user_id = c.user_id
    // WHERE u.email = '${email}';`;
    // return new Promise((resolve, reject) => {
    //   conn.query(query, (err, results) => {
    //     if (err) return reject(err);
    //     return resolve(results);
    //   });
    // });
  }

  async getDetails(id) {
    return Purchases.findAll({
      where: { purchase_id: id },
    });
  }

  static async updateState(orderId, status) {
    const order = await this.getDetails(orderId);
    if (!order) return { message: 'Pedido inexistente' };
    const orders = await Purchases.update(
      { status },
      {
        where: { purchase_id: orderId },
      }
    )
    ;

    console.table([order, orders]);

    return UserMapper.toEntity(orders);

    // const query = `UPDATE purchase SET finished = 1 WHERE purchase_id = '${orderId}'`;
    // return new Promise((resolve, reject) => {
    //   conn.query(query, (err, _results) => {
    //     if (err) return reject(err);
    //     return resolve({ message: 'Pedido entregue com sucesso!' });
    //   });
    // });
  }
}

module.exports = PurchaseRepository;
