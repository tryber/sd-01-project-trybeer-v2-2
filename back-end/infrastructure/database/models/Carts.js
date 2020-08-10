const Carts = (sequelize, DataTypes) => {
  const Carts = sequelize.define(
    'Carts',
    {
      cart_id: { type: DataTypes.INTEGER, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      timestamps: false,
    }
  );

  Carts.associate = (models) => {
    Carts.belongsToMany(models.Products, {
      through: 'Cart_products',
      foreignKey: 'cart_id',
    });

    Carts.belongsTo(models.Users, { foreignKey: 'user_id' });

    Carts.belongsTo(models.Purchases, { foreignKey: 'cart_id' });
  };

  return Carts;
};

module.exports = Carts;
