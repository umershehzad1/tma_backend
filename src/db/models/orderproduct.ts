import { Model, DataTypes, Sequelize } from 'sequelize';

interface OrderProductAttributes {
  id?: number;
  product_id: number;
  product_name: string;
  size: string;
  product_quantity: number;
  unit_price: number;
  total_price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
  class OrderProduct extends Model<OrderProductAttributes> implements OrderProductAttributes {
    public id!: number;
    public product_id!: number;
    public product_name!: string;
    public size!: string;
    public product_quantity!: number;
    public unit_price!: number;
    public total_price!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      OrderProduct.belongsTo(models.Order, {
        foreignKey: 'order_id'
      });
      OrderProduct.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }

  OrderProduct.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true
    },
    product_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    unit_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    total_price: {
      type: DataTypes.DECIMAL,
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
    modelName: 'OrderProduct',
  });

  return OrderProduct;
};
