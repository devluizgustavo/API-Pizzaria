'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('orders-by-pizzas', {
      id_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id_order'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      id_pizza: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pizzas',
          key: 'id_pizza'
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('orders-by-pizzas');
  }
};
