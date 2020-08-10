'use strict';

const factory = (DataTypes) => ({
  user_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  admin: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

module.exports = {
  up: async (queryInterface, DataTypes) =>
    queryInterface.createTable('Users', factory(DataTypes)),
  down: async (queryInterface) => queryInterface.dropTable('Users'),
};
