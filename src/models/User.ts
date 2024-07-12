import { DataTypes, Model, Association } from "sequelize";
import sequelizeConnection from "../db/connection";
import Order from "./Order";
import CartProduct from "./Cartproduct";
import Favourite from "./Favourite";
import Subscription from "./Subscription";
class User extends Model {
  public id?: number;
  public name!: string;
  public email!: string;
  public password?: string;
  public phone?: string;
  public billing_address?: string;
  public shipping_information?: string;
  public image?: string;
  public google_token?: string;
  public stripe_customer_id?: string;
  public role!: "admin" | "user" | "wholeseller";

  // timestamps!
  public readonly created_at!: Date;
  public readonly last_updated!: Date;

  public static associations: {
    orders: Association<User, Order>;
    cartProducts: Association<User, CartProduct>;
    favourites: Association<User, Favourite>;
    subscriptions: Association<User, Subscription>;
  };

  static associate() {
    User.hasMany(Order, {
      foreignKey: "user_id",
      as: "orders"
    });
    User.hasMany(CartProduct, {
      foreignKey: "user_id",
      as: "cartProducts"
    });
    User.hasMany(Favourite, {
      foreignKey: "user_id",
      as: "favourites"
    });
    User.hasMany(Subscription, {
      foreignKey: "user_id",
      as: "subscriptions"
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    billing_address: {
      type: DataTypes.STRING,
    },
    shipping_information: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    google_token: {
      type: DataTypes.TEXT,
    },
    stripe_customer_id: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("admin", "user", "wholeseller"),
      defaultValue: "user",
    },
  
  },
  {
    sequelize: sequelizeConnection,
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default User;
