// migrations/user.ts
'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof import('sequelize')) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.ENUM('admin', 'user', 'wholeseller'),
        defaultValue: 'user'
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      billing_address: {
        type: DataTypes.STRING
      },
      shipping_information: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      google_token: {
        type: DataTypes.TEXT
      },
      stripe_customer_id: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface: QueryInterface, Sequelize: typeof import('sequelize')) => {
    await queryInterface.dropTable('Users');
  }
};
