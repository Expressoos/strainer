'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn( 'Users', 'password', Sequelize.STRING );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn( 'Users', 'password' );
  }
};
