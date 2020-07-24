const Products = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    'Products',
    {
      product_id: { type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.STRING,
      price: DataTypes.DOUBLE,
    },
    {
      timestamps: false,
    }
  );

  Products.associate = models => {
    Products.belongsToMany(models.Carts, {
      through: 'Cart_products',
      foreignKey: 'product_id',
    });
  };
  return Products;
};

module.exports = Products;
