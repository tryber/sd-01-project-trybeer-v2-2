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
    if (!user) return false;
    return UserMapper.toEntity(user);
  }

  static async validateEmail(email) {
    const user = await Users.findOne({
      where: {
        email,
      },
    });
    if (!user) return false;
    return UserMapper.toEntity(user);
  }

  static async updateNameUser(name, email) {
    return Users.update({ name }, { where: { email } });
  }
}

module.exports = UserRepository;
