'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    queryInterface.sequelize.query("ALTER TABLE Articles \
      ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) \
      REFERENCES user (id) MATCH SIMPLE \
      ON UPDATE CASCADE \
      ON DELETE CASCADE;"
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
