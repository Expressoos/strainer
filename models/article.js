'use strict';
module.exports = (sequelize, DataTypes) => {
  var Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
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
    classMethods: {
      associate: function(models) {
        
        // associations can be defined here
        Article.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Article;
};