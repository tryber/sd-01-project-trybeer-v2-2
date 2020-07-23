const Users = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      user_id: { type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  return Users;
};

module.exports = Users;
