'use strict';
module.exports = (sequelize, DataTypes) => {

  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE(3),
      field: 'createdAt',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      field: 'updatedAt',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    }
  }, {
    timestamps: true,

    hooks: (user) => {
	     if(user.changed('password')) {
	        return bcrypt.hash(user.password, 10).then(function(password) {
	            user.password = password;
	        });
	    }
	}
  }
  });

  return User;
};