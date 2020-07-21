'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'Skol Lata 350ml',
          price: 2.2,
        },
        {
          name: 'Heineken 600ml',
          price: 7.5,
        },
        {
          name: 'Antarctica Pilsen 300ml',
          price: 2.49,
        },
        {
          name: 'Brahma 600ml',
          price: 7.5,
        },
        {
          name: 'Skol 269ml',
          price: 2.19,
        },
        {
          name: 'Skol Beats Senses 313ml',
          price: 4.49,
        },
        {
          name: 'Becks 330ml',
          price: 4.99,
        },
        {
          name: 'Brahma Duplo Malte 350ml',
          price: 2.79,
        },
        {
          name: 'Becks 600ml',
          price: 8.89,
        },
        {
          name: 'Skol Beats Senses 269ml',
          price: 3.57,
        },
        {
          name: 'Stella Artois 275ml',
          price: 3.49,
        },
      ],
      {}
    ),

  down: async (queryInterface) =>
    queryInterface.bulkDelete('Products', null, {}),
};
