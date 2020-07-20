const conn = require('../connection');

class User {
  constructor(name, email, password, role) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  async createUser() {
    const { name, email, password, role } = this;
    const admin = role ? 1 : 0;
    const query = `INSERT INTO user (name, email, admin, password) VALUES ('${name}', '${email}', '${admin}', '${password}')`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, _results) => {
        if (err) return reject(err);
        return resolve({ name, email, password, role: admin });
      });
    });
  }

  static async validateEmail(email) {
    const query = `SELECT * FROM user WHERE email = '${email}';`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      });
    });
  }

  static async getUserbyId(id) {
    const query = `SELECT name, email FROM user WHERE user_id = '${id}';`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }

  async updateNameUser() {
    const { name, email } = this;
    const query = `UPDATE user SET name = '${name}' WHERE email = '${email}';`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, _results) => {
        if (err) return reject(err);
        return resolve(this);
      });
    });
  }
}

module.exports = User;
