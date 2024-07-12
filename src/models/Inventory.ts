import { DataTypes, Model, Association } from "sequelize";
import sequelizeConnection from "../db/connection";
import Product from "./Product";

class Inventory extends Model {
  public product_id!: number;
  public product_size!: string;
  public inventory_quantity!: number;
  public inventory_price!: number;
  public inventory_discount!: number;
  public images!: string;

  public static associations: {
    product: Association<Inventory, Product>;
  };

  static associate() {
    Inventory.belongsTo(Product, {
      foreignKey: "product_id",
      as: "product",
    });
  }
}

Inventory.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inventory_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inventory_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    inventory_discount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    images: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "inventories",
    modelName: "Inventory",
  }
);

export default Inventory;
