const Products = (sequelize, DataTypes) => {
    const Products = sequelize.define(
      'Products',
      {
        product_id: { type: DataTypes.NUMBER, primaryKey: true },
        name: DataTypes.STRING,
        price: DataTypes.DOUBLE,
      },
      {
        timestamps: false,
      }
    );
    return Products;
  };
  
  module.exports = Products;