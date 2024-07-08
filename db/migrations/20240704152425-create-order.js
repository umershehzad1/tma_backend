'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_no: {
        type: Sequelize.STRING
      },
      billing_info: {
        type: Sequelize.STRING
      },
      shipping_info: {
        type: Sequelize.STRING
      },
      additional_info: {
        type: Sequelize.STRING
      },
      payment_method: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};