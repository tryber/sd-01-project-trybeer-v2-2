const User = require('../../domain/user');

const UserMapper = {
  toEntity({ dataValues }) {
    const { user_id, name, email, admin, password } = dataValues;
    return new User({ user_id, name, email, admin, password });
  },

  toDatabase(survivor) {
    const { name, email, admin, password } = survivor;
    const role = admin ? 1 : 0;
    return { name, email, admin: role, password };
  },
};

module.exports = UserMapper;
