const conn = require('../connection');

class Order {
  constructor(street, number, cartId, price, purchaseDate, finished) {
    this.street = street;
    this.number = number;
    this.cartId = cartId;
    this.price = price;
    this.purchaseDate = purchaseDate;
    this.finished = finished;
  }

  async create() {
    const { street, number, finished, cartId, price, purchaseDate } = this;
    if (!finished) this.finished = 0;

    const query = `INSERT INTO purchase (street, number, cart_id, price, purchase_date, finished) VALUES
      ('${street}', '${number}', '${cartId}', '${price}', '${purchaseDate}', '${this.finished}');`;

    return new Promise((resolve, reject) => {
      conn.query(query, (err, _results) => {
        if (err) return reject(err);
        return resolve(this);
      });
    });
  }

  static async getAll() {
    const query = 'SELECT * FROM purchase;';
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }

  static async getUserOrders(email) {
    const query = `SELECT purchase_id, street, number, finished, price, purchase_date FROM purchase AS p
    INNER JOIN cart AS c ON c.cart_id = p.cart_id
    INNER JOIN user AS u ON u.user_id = c.user_id
    WHERE u.email = '${email}';`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
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

module.exports = Order;
