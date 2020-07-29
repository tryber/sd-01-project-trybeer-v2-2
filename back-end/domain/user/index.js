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
})(class User {});

module.exports = User;
