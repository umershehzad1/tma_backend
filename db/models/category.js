'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: 'category_id'
      });
    }
  }
  Category.init({
    category_name: DataTypes.STRING,
    category_image: DataTypes.STRING,
    cloudinary_id : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
