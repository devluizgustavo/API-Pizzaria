'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('orders', 'production_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'production',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('orders', 'production_id')
  }
};
