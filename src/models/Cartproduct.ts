import { DataTypes, Model, Association } from "sequelize";
import sequelizeConnection from "../db/connection";
import User from "./User";
import Product from "./Product";

class CartProduct extends Model {
  public product_id!: number;
  public user_id!: number;
  public product_size!: string;
  public product_quantity!: number;
  public cart_last_updated_date!: Date;

  public static associations: {
    user: Association<CartProduct, User>;
    product: Association<CartProduct, Product>;
  };

  static associate() {
    CartProduct.belongsTo(User, {
      foreignKey: "user_id",
      as: "user",
    });
    CartProduct.belongsTo(Product, {
      foreignKey: "product_id",
      as: "product",
    });
  }
}

CartProduct.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cart_last_updated_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "cart_products",
    modelName: "CartProduct",
  }
);

export default CartProduct;
