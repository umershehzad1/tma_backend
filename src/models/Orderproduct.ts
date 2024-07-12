import { DataTypes, Model, Association } from "sequelize";
import sequelizeConnection from "../db/connection";
import Order from "./Order";
import Product from "./Product";

class OrderProduct extends Model {
  public product_id!: number;
  public product_name!: string;
  public size!: string;
  public product_quantity!: number;
  public unit_price!: number;
  public total_price!: number;

  public static associations: {
    order: Association<OrderProduct, Order>;
    product: Association<OrderProduct, Product>;
  };

  static associate() {
    OrderProduct.belongsTo(Order, {
      foreignKey: "order_id",
      as: "order",
    });
    OrderProduct.belongsTo(Product, {
      foreignKey: "product_id",
      as: "product",
    });
  }
}

OrderProduct.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "order_products",
    modelName: "OrderProduct",
  }
);

export default OrderProduct;
