'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      category_name: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.DECIMAL
      },
      description: {
        type: Sequelize.TEXT
      },
      feature_image: {
        type: Sequelize.TEXT // Changed from STRING to TEXT
      },
      discount_date: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.DECIMAL
      },
      size: {
        type: Sequelize.STRING
      },
      discount: {
        type: Sequelize.DECIMAL
      },
      is_featured: {
        type: Sequelize.BOOLEAN
      },
      tags: {
        type: Sequelize.STRING
      },
      total_orders: {
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      is_top_selling: {
        type: Sequelize.BOOLEAN
      },
      is_limited_stock: {
        type: Sequelize.BOOLEAN
      },
      is_TMA_delivered: {
        type: Sequelize.BOOLEAN
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};
