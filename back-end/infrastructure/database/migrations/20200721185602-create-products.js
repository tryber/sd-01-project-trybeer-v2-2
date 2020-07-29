'use strict';

const factory = (DataTypes) => ({
  product_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.DOUBLE,
  },
});

module.exports = {
  up: async (queryInterface, DataTypes) =>
    queryInterface.createTable('Products', factory(DataTypes)),
  down: async (queryInterface) => queryInterface.dropTable('Products'),
};
