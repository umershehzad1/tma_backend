import { Model, DataTypes, Sequelize } from 'sequelize';

interface CartProductAttributes {
  id?: number;
  product_id: number;
  user_id: number;
  product_size: string;
  product_quantity: number;
  cart_last_updated_date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
  class CartProduct extends Model<CartProductAttributes> implements CartProductAttributes {
    public id!: number;
    public product_id!: number;
    public user_id!: number;
    public product_size!: string;
    public product_quantity!: number;
    public cart_last_updated_date!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      CartProduct.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      CartProduct.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }

  CartProduct.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_size: {
      type: DataTypes.STRING,
      allowNull: true
    },
    product_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cart_last_updated_date: {
      type: DataTypes.DATE,
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
    modelName: 'CartProduct',
  });

  return CartProduct;
};
