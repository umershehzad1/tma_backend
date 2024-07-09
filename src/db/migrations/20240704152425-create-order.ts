import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      order_no: {
        type: DataTypes.STRING
      },
      billing_info: {
        type: DataTypes.STRING
      },
      shipping_info: {
        type: DataTypes.STRING
      },
      additional_info: {
        type: DataTypes.STRING
      },
      payment_method: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      },
      user_id: {
        type: DataTypes.INTEGER
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
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('Orders');
  }
};
