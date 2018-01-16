'use strict';
module.exports = (sequelize, DataTypes) => {
  var Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {
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