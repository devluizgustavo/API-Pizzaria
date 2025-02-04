'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('Drinks', {
      id_drink: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      drink_name: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: {
          msg: "Bebida já existe"
        }
      },
      price: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false,
      },
      stock_qnt: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Drinks');
  }
};
