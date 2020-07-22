const UserMapper = require('./UserMapper');

const { Users } = require('../database/models');

class UserRepository {
  static async createUser(obj = {}) {
    const newUser = await Users.create(UserMapper.toDatabase(obj));
    return UserMapper.toEntity(newUser);
  }

  static async login(email, password) {
    const user = await Users.findOne({
      where: {
        email,
        password,
      },
    });
    return UserMapper.toEntity(user);
  }

  static async validateEmail(email) {
    const user = await Users.findOne({
      where: {
        email,
      },
    });
    return UserMapper.toEntity(user);
  }
  
  static async updateNameUser(name, email) {
    const newUser = await Users.update({ name }, { where: { email } });
    return UserMapper.toEntity(newUser);
  }

  // static async getUserbyId(id) {
  //   const user = await Users.findOne({
  //     where: {
  //       user_id: id,
  //     },
  //   });
  //   return UserMapper.toEntity(user);
  // }

  //   static async getUserbyId(id) {
  //     const query = `SELECT name, email FROM user WHERE user_id = '${id}';`;
  //     return new Promise((resolve, reject) => {
  //       conn.query(query, (err, results) => {
  //         if (err) return reject(err);
  //         return resolve(results);
  //       });
  //     });
  //   }

  
}

module.exports = UserRepository;
