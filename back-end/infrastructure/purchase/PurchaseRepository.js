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


  static async getUserOrders(email) {
   return Carts.findAll({
      where: { email: email },
      include: [
        {
          model: Purchases,
        
          where: { cart_id : Purchases.cart_id },
        },
        {
          model: Users,
         
          where: { user_id : Users.user_id },
        },
      ],
    });
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


  static async getDetails(orderId) {
    const query = `SELECT * FROM purchase WHERE purchase_id = '${orderId}';`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      });
    });
  }

  static async updateState(orderId) {
    const order = await this.getDetails(orderId);
    if (!order) return { message: 'Pedido inexistente' };

    const query = `UPDATE purchase SET finished = 1 WHERE purchase_id = '${orderId}'`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, _results) => {
        if (err) return reject(err);
        return resolve({ message: 'Pedido entregue com sucesso!' });
      });
    });
  }
}

module.exports = PurchaseRepository;
