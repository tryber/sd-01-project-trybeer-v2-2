const Cart_products = (sequelize, DataTypes) => {
  const Cart_products = sequelize.define(
    'Cart_products',
    {
      product_id: { type: DataTypes.INTEGER, foreignKey: true },
      cart_id: { type: DataTypes.INTEGER, foreignKey: true },
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
  return Cart_products;
};

module.exports = Cart_products;
