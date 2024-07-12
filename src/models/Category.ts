import { DataTypes, Model, Association } from "sequelize";
import sequelizeConnection from "../db/connection";
import Product from "./Product";

class Category extends Model {
  public category_name!: string;
  public category_image!: string;
  public static associations: {
    products: Association<Category, Product>;
  };

  static associate() {
    Category.hasMany(Product, {
      foreignKey: "category_id",
      as: "products",
    });
  }
}

Category.init(
  {
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "categories",
    modelName: "Category",
  }
);

export default Category;
