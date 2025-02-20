'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Drinks', [
      {
        drink_name: 'Coca Cola',
        price: 17.00,
        stock_qnt: 30,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        drink_name: 'Fanta',
        price: 15.00,
        stock_qnt: 22,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        drink_name: 'Dolly',
        price: 10.00,
        stock_qnt: 40,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        drink_name: 'Cerveja',
        price: 4.90,
        stock_qnt: 15,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("drinks", null, {})
  }
};
