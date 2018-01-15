var config    = require('../config'),
	Sequelize = require('sequelize'),
	mysql     = require('mysql');

module.exports = {
		seq : () => {
			return new Sequelize(
			    config.database.name,
			    config.database.user,
			    config.database.password,
			    config.database.details
			)
		},
		dbConnect: () => {
			var connection = mysql.createConnection({
			  host     : config.database.host,
			  user     : config.database.user,
			  password : config.database.password,
			  database : config.database.database
			});

			return connection;
		}

};