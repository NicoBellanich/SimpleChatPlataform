import crypto from "crypto";
import { sign } from "jsonwebtoken";
("use strict");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      firstname: { allowNull: false, type: DataTypes.STRING },
      lastname: { allowNull: false, type: DataTypes.STRING },
      username: { allowNull: false, type: DataTypes.STRING, unique: true },
      salt: { allowNull: true, type: DataTypes.STRING },
      password: { allowNull: false, type: DataTypes.STRING },
    },
    {}
  );

  User.associate = function (models) {
    // associations can be defined here
  };

  // Instance methods
  User.prototype.passwordMatches = function (value) {
    return User.getEncryptedPassword(value, this.salt) === this.password;
  };

  User.prototype.getAccessToken = function () {
    return sign(
      { id: this.id, username: this.username },
      process.env.SECRET_PASSWORD,
      {
        expiresIn: "10d",
        subject: this.id,
      }
    );
  };

  // Class methods
  User.hashPasswordHook = async function (user) {
    if (!user.password || !user.changed("password")) return user;
    user.salt = this.getRandomSalt();
    user.password = await User.getEncryptedPassword(user.password, user.salt);
  };

  User.getEncryptedPassword = function (plainPassword, salt) {
    return crypto.scryptSync(plainPassword, salt, 64).toString("hex");
  };

  User.getRandomSalt = function (bytes = 16) {
    return crypto.randomBytes(bytes).toString("hex");
  };

  User.findByUsername = function ({ username }) {
    return this.findOne({ where: { username } });
  };

  // hooks
  User.beforeCreate(User.hashPasswordHook.bind(User));
  User.beforeUpdate(User.hashPasswordHook.bind(User));

  return User;
};
