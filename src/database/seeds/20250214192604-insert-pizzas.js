'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "pizzas",
      [
        {
          pizza_name: 'Margherita',
          size: 'Média',
          description: 'Pizza clássica com molho de tomate, queijo mozzarella e manjericão fresco.',
          price: 29.90,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pizza_name: 'Pepperoni',
          size: 'Grande',
          description: 'Pizza com molho de tomate, queijo mozzarella e fatias de pepperoni.',
          price: 34.90,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pizza_name: 'Frango com Catupiry',
          size: 'Média',
          description: 'Pizza com peito de frango desfiado, catupiry e orégano.',
          price: 32.90,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pizza_name: 'Calabresa',
          size: 'Grande',
          description: 'Pizza com molho de tomate, queijo mozzarella e linguiça calabresa.',
          price: 33.90,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pizza_name: 'Portuguesa',
          size: 'Média',
          description: 'Pizza com presunto, queijo, ovos, azeitonas, cebolas e molho de tomate.',
          price: 35.90,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pizza_name: 'Vegetariana',
          size: 'Grande',
          description: 'Pizza com molho de tomate, legumes variados e queijo mozzarella.',
          price: 30.90,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pizza_name: 'Havaiana',
          size: 'Média',
          description: 'Pizza com presunto, queijo, abacaxi e molho de tomate.',
          price: 31.90,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pizza_name: '4 Queijos',
          size: 'Grande',
          description: 'Pizza com molho de tomate, queijos mozzarella, parmesão, gorgonzola e provolone.',
          price: 36.90,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pizza_name: 'Frutos do Mar',
          size: 'Grande',
          description: 'Pizza com molho branco, camarões, mariscos e queijo parmesão.',
          price: 42.90,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pizza_name: 'Bacon e Cheddar',
          size: 'Média',
          description: 'Pizza com bacon crocante, cheddar e molho barbecue.',
          price: 33.90,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ], {});
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("pizzas", null, {})
  }
};
