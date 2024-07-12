import { DataTypes, Model, Association } from "sequelize";
import sequelizeConnection from "../db/connection";
import User from "./User";
import Product from "./Product";

class Favourite extends Model {
  public product_id!: number;
  public user_id!: number;

  public static associations: {
    user: Association<Favourite, User>;
    product: Association<Favourite, Product>;
  };

  static associate() {
    Favourite.belongsTo(User, {
      foreignKey: "user_id",
      as: "user",
    });
    Favourite.belongsTo(Product, {
      foreignKey: "product_id",
      as: "product",
    });
  }
}

Favourite.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "favourites",
    modelName: "Favourite",
  }
);

export default Favourite;
