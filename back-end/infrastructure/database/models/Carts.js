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
  return Carts;
};

module.exports = Carts;
