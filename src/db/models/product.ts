import { Model, DataTypes, Sequelize } from 'sequelize';

interface ProductAttributes {
  id?: number;
  product_name: string;
  category_name: string;
  rating: number;
  description: string;
  feature_image: string;
  discount_date: Date;
  price: number;
  size: string;
  discount: number;
  is_featured: boolean;
  tags: string;
  total_orders: number;
  category_id: number;
  is_top_selling: boolean;
  is_limited_stock: boolean;
  is_TMA_delivered: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
  class Product extends Model<ProductAttributes> implements ProductAttributes {
    public id!: number;
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
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id'
      });
      Product.hasMany(models.Inventory, {
        foreignKey: 'product_id'
      });
      Product.hasMany(models.OrderProduct, {
        foreignKey: 'product_id'
      });
      Product.hasMany(models.CartProduct, {
        foreignKey: 'product_id'
      });
      Product.hasMany(models.Favourite, {
        foreignKey: 'product_id'
      });
      Product.hasMany(models.Subscription, {
        foreignKey: 'product_id'
      });
    }
  }

  Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    feature_image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    discount_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_orders: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      }
    },
    is_top_selling: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_limited_stock: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_TMA_delivered: {
      type: DataTypes.BOOLEAN,
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
    modelName: 'Product',
  });

  return Product;
};
