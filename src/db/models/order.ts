import { Model, DataTypes, Sequelize } from 'sequelize';

interface OrderAttributes {
  id?: number;
  order_no: string;
  billing_info: string;
  shipping_info: string;
  additional_info: string;
  payment_method: string;
  status: string;
  user_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
  class Order extends Model<OrderAttributes> implements OrderAttributes {
    public id!: number;
    public order_no!: string;
    public billing_info!: string;
    public shipping_info!: string;
    public additional_info!: string;
    public payment_method!: string;
    public status!: string;
    public user_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      Order.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Order.hasMany(models.OrderProduct, {
        foreignKey: 'order_id'
      });
    }
  }

  Order.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    order_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    billing_info: {
      type: DataTypes.STRING,
      allowNull: true
    },
    shipping_info: {
      type: DataTypes.STRING,
      allowNull: true
    },
    additional_info: {
      type: DataTypes.STRING,
      allowNull: true
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Order',
  });

  return Order;
};
