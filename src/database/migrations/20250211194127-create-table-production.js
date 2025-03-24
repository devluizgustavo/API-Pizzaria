'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('production', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      status: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      estimed_time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dt_production: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: Sequelize.NOW
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
    return queryInterface.dropTable('production');
  }
};
