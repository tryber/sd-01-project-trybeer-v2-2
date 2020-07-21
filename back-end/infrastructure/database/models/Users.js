const Users = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
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
