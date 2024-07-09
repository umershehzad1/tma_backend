import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      product_name: {
        type: DataTypes.STRING
      },
      category_name: {
        type: DataTypes.STRING
      },
      rating: {
        type: DataTypes.DECIMAL
      },
      description: {
        type: DataTypes.TEXT
      },
      feature_image: {
        type: DataTypes.TEXT
      },
      discount_date: {
        type: DataTypes.DATE
      },
      price: {
        type: DataTypes.DECIMAL
      },
      size: {
        type: DataTypes.STRING
      },
      discount: {
        type: DataTypes.DECIMAL
      },
      is_featured: {
        type: DataTypes.BOOLEAN
      },
      tags: {
        type: DataTypes.STRING
      },
      total_orders: {
        type: DataTypes.INTEGER
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      is_top_selling: {
        type: DataTypes.BOOLEAN
      },
      is_limited_stock: {
        type: DataTypes.BOOLEAN
      },
      is_TMA_delivered: {
        type: DataTypes.BOOLEAN
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
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('Products');
  }
};
