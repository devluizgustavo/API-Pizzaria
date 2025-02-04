'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('Addresses', {
      id_address: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_customer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'id_customer'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      zip_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      neighborhood: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      house_number: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      complement: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down (queryInterface) {
    return queryInterface.dropTable('Addresses');
  }
};
