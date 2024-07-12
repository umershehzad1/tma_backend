import { DataTypes, Model, Association } from "sequelize";
import sequelizeConnection from "../db/connection";
import User from "./User";
import Product from "./Product";

class Subscription extends Model {
  public user_id!: number;
  public email!: string;
  public product_id!: number;

  public static associations: {
    user: Association<Subscription, User>;
    product: Association<Subscription, Product>;
  };

  static associate() {
    Subscription.belongsTo(User, {
      foreignKey: "user_id",
      as: "user",
    });
    Subscription.belongsTo(Product, {
      foreignKey: "product_id",
      as: "product",
    });
  }
}

Subscription.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "subscriptions",
    modelName: "Subscription",
  }
);

export default Subscription;
