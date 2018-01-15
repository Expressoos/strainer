var config = require('../config'),
	Sequelize = require('sequelize');

module.exports = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    config.database.details
);