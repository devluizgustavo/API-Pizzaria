'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface) {
    return queryInterface.addConstraint('addresses', {
      fields: ['zip_code', 'id_customer'],
      type: 'unique',
      name: 'address_zip_code_customer_uni',
    })
  },

  down (queryInterface) {
    return queryInterface.removeConstraint('addresses', 'address_zip_code_customer_uni')
  }
};
