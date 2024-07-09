import { Model, DataTypes, Sequelize } from 'sequelize';

interface FavouriteAttributes {
  id?: number;
  product_id: number;
  user_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
  class Favourite extends Model<FavouriteAttributes> implements FavouriteAttributes {
    public id!: number;
    public product_id!: number;
    public user_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      Favourite.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Favourite.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }

  Favourite.init({
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
    modelName: 'Favourite',
  });

  return Favourite;
};
