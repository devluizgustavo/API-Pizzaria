'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('addresses', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_customer: {
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      zip_code: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      street: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      neighborhood: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      state: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      house_number: {
        type: Sequelize.STRING(0),
        allowNull: false
      },
      neighborhood: {
        type: Sequelize.STRING(25),
        allowNull: true
      },
      complement: {
        type: Sequelize.STRING(30),
        allowNull: true,
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

  down (queryInterface) {
    return queryInterface.dropTable('addresses');
  }
};
