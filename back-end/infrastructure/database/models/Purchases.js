const Purchases = (sequelize, DataTypes) => {
  const Purchases = sequelize.define(
    'Purchases',
    {
      purchase_id: { type: DataTypes.INTEGER, primaryKey: true },
      street: DataTypes.STRING,
      number: DataTypes.INTEGER,
      status: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      purchase_date: DataTypes.DATE,
      cart_id: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      timestamps: false,
    }
  );

  Purchases.associate = models => {
    Purchases.belongsTo(models.Carts, {
      through: 'Carts',
      foreignKey: 'purchase_id',
    });    
  };

  return Purchases;
};



module.exports = Purchases;
