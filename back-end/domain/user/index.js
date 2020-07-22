const { attributes } = require('structure');

const User = attributes({
  user_id: Number,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  admin: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})(
  class User {
    getAllUsers() {
      const { user_id, name, email, admin, password } = this;
      return { user_id, name, email, admin, password };
    }
  }
);

module.exports = User;
