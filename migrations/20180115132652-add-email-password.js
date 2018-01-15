'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn( 'Users', 'email', Sequelize.STRING );
    queryInterface.addColumn( 'Users', 'username', Sequelize.STRING );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn( 'Users', 'email' );
    queryInterface.removeColumn( 'Users', 'username' );
  }
};
