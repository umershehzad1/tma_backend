'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, {
        foreignKey: 'user_id'
      });
      User.hasMany(models.CartProduct, {
        foreignKey: 'user_id'
      });
      User.hasMany(models.Favourite, {
        foreignKey: 'user_id'
      });
      User.hasMany(models.Subscription, {
        foreignKey: 'user_id'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'user', 'wholeseller'],
      defaultValue: 'user'
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    billing_address: DataTypes.STRING,
    shipping_information: DataTypes.STRING,
    image: DataTypes.STRING,
    google_token: {
      type: DataTypes.TEXT,  // Changed from STRING to TEXT
    },
    stripe_customer_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
