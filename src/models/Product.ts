import { DataTypes, Model, Association } from "sequelize";
import sequelizeConnection from "../db/connection";
import Category from "./Category";
import Inventory from "./Inventory";
import OrderProduct from "./Orderproduct";
import CartProduct from "./Cartproduct";
import Favourite from "./Favourite";
import Subscription from "./Subscription";

class Product extends Model {
  public product_name!: string;
  public category_name!: string;
  public rating!: number;
  public description!: string;
  public feature_image!: string;
  public discount_date!: Date;
  public price!: number;
  public size!: string;
  public discount!: number;
  public is_featured!: boolean;
  public tags!: string;
  public total_orders!: number;
  public category_id!: number;
  public is_top_selling!: boolean;
  public is_limited_stock!: boolean;
  public is_TMA_delivered!: boolean;

  public static associations: {
    category: Association<Product, Category>;
    inventories: Association<Product, Inventory>;
    orderProducts: Association<Product, OrderProduct>;
    cartProducts: Association<Product, CartProduct>;
    favourites: Association<Product, Favourite>;
    subscriptions: Association<Product, Subscription>;
  };

  static associate() {
    Product.belongsTo(Category, {
      foreignKey: "category_id",
      as: "category",
    });
    Product.hasMany(Inventory, {
      foreignKey: "product_id",
      as: "inventories",
    });
    Product.hasMany(OrderProduct, {
      foreignKey: "product_id",
      as: "orderProducts",
    });
    Product.hasMany(CartProduct, {
      foreignKey: "product_id",
      as: "cartProducts",
    });
    Product.hasMany(Favourite, {
      foreignKey: "product_id",
      as: "favourites",
    });
    Product.hasMany(Subscription, {
      foreignKey: "product_id",
      as: "subscriptions",
    });
  }
}

Product.init(
  {
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    feature_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    discount_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_orders: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_top_selling: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_limited_stock: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_TMA_delivered: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "products",
    modelName: "Product",
  }
);

export default Product;
