'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
        first_name: 'John',
        last_name: 'Doe',
        bio: 'LOrem...',
        username: 'johndoe',
        email: 'john@doe.com',
        password : 'qjskdhqskjd',
        createdAt : new Date(),
        updatedAt : new Date(),
      }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};