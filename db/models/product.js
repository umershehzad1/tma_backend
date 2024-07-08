'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id'
      });
      Product.hasMany(models.Inventory, {
        foreignKey: 'product_id'
      });
      Product.hasMany(models.OrderProduct, {
        foreignKey: 'product_id'
      });
      Product.hasMany(models.CartProduct, {
        foreignKey: 'product_id'
      });
      Product.hasMany(models.Favourite, {
        foreignKey: 'product_id'
      });
      Product.hasMany(models.Subscription, {
        foreignKey: 'product_id'
      });
    }
  }
  Product.init({
    product_name: DataTypes.STRING,
    category_name: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    feature_image: DataTypes.TEXT, // Changed from STRING to TEXT
    discount_date: DataTypes.DATE,
    price: DataTypes.DECIMAL,
    size: DataTypes.STRING,
    discount: DataTypes.DECIMAL,
    is_featured: DataTypes.BOOLEAN,
    tags: DataTypes.STRING,
    total_orders: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    is_top_selling: DataTypes.BOOLEAN,
    is_limited_stock: DataTypes.BOOLEAN,
    is_TMA_delivered: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
