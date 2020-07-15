"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      queryInterface.changeColumn(
        "Users",
        "firstname",
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      ),
        queryInterface.changeColumn(
          "Users",
          "lastname",
          {
            type: Sequelize.STRING,
            allowNull: false,
          },
          { transaction }
        ),
        queryInterface.changeColumn(
          "Users",
          "username",
          {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          { transaction }
        ),
        queryInterface.changeColumn(
          "Users",
          "salt",
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
          { transaction }
        ),
        queryInterface.changeColumn(
          "Users",
          "password",
          {
            type: Sequelize.STRING,
            allowNull: false,
          },
          { transaction }
        );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      queryInterface.changeColumn(
        "Users",
        "firstname",
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        { transaction }
      ),
        queryInterface.changeColumn(
          "Users",
          "lastname",
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
          { transaction }
        ),
        queryInterface.changeColumn(
          "Users",
          "username",
          {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
          },
          { transaction }
        ),
        queryInterface.changeColumn(
          "Users",
          "salt",
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
          { transaction }
        ),
        queryInterface.changeColumn(
          "Users",
          "password",
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
          { transaction }
        );
    });
  },
};
