'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    salt: DataTypes.STRING,
    password: DataTypes.STRING
  }, {})
  User.associate = function (models) {
    // associations can be defined here
  }
  return User
}
