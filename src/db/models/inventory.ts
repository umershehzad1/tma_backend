import { Model, DataTypes, Sequelize } from 'sequelize';

interface InventoryAttributes {
  id?: number;
  product_id: number;
  product_size: string;
  inventory_quantity: number;
  inventory_price: number;
  inventory_discount: number;
  images: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
  class Inventory extends Model<InventoryAttributes> implements InventoryAttributes {
    public id!: number;
    public product_id!: number;
    public product_size!: string;
    public inventory_quantity!: number;
    public inventory_price!: number;
    public inventory_discount!: number;
    public images!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      Inventory.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }

  Inventory.init({
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
    product_size: {
      type: DataTypes.STRING,
      allowNull: true
    },
    inventory_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    inventory_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    inventory_discount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    images: {
      type: DataTypes.STRING,
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
    modelName: 'Inventory',
  });

  return Inventory;
};
