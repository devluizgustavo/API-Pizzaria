'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('delivery', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      status: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      delivery_forecast: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      dt_delivery: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('delivery');
  }
};
