'use strict';

const factory = DataTypes => ({
  product_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'Products',
      key: 'product_id',
    }
  },
  cart_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'Carts',
      key: 'cart_id',
    }
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

module.exports = {
  up: async (queryInterface, DataTypes) =>
    queryInterface.createTable('Cart_products', factory(DataTypes)),
  down: async queryInterface => queryInterface.dropTable('Cart_products'),
};

