'use strict';

const factory = DataTypes => ({
  purchase_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  street: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  number: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  finished: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  cart_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'Carts',
      key: 'cart_id',
    }
  },
  price: {
    allowNull: false,
    type: DataTypes.DOUBLE,
  },
  purchase_date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
});

module.exports = {
  up: async (queryInterface, DataTypes) =>
    queryInterface.createTable('Purchases', factory(DataTypes)),
  down: async queryInterface => queryInterface.dropTable('Purchases'),
};

