'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('Contacts', {
      id_contact: {
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
      number_phone: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: {
          msg: 'O numero já está cadastrado'
        },
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: {
          msg: 'O email já está cadastrado'
        }
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
    return queryInterface.dropTable('Contacts');
  }
};
