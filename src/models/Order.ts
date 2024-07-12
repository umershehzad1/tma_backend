import { DataTypes, Model, Association } from "sequelize";
import sequelizeConnection from "../db/connection";
import User from "./User";
import OrderProduct from "./Orderproduct";

class Order extends Model {
  public order_no!: string;
  public billing_info!: string;
  public shipping_info!: string;
  public additional_info!: string;
  public payment_method!: string;
  public status!: string;
  public user_id!: number;

  public static associations: {
    user: Association<Order, User>;
    orderProducts: Association<Order, OrderProduct>;
  };

  static associate() {
    Order.belongsTo(User, {
      foreignKey: "user_id",
      as: "user",
    });
    Order.hasMany(OrderProduct, {
      foreignKey: "order_id",
      as: "orderProducts",
    });
  }
}

Order.init(
  {
    order_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billing_info: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shipping_info: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    additional_info: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "orders",
    modelName: "Order",
  }
);

export default Order;
