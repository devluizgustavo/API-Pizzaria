'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('orders-by-drinks', {
      id_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      id_drink: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'drinks',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('orders-by-drinks');
  }
};
