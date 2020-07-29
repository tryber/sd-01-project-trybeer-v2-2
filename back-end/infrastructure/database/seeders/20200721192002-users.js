'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Toninho',
          email: 'toninho@gmail.com',
          admin: 0,
          password: '123456',
        },
        {
          name: 'Guilherme',
          email: 'guilherme@gmail.com',
          admin: 1,
          password: '123456',
        },
      ],
      {}
    ),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
