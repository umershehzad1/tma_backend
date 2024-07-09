import { Model, DataTypes, Sequelize } from 'sequelize';

interface SubscriptionAttributes {
  id?: number;
  user_id: number;
  email: string;
  product_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
  class Subscription extends Model<SubscriptionAttributes> implements SubscriptionAttributes {
    public id!: number;
    public user_id!: number;
    public email!: string;
    public product_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      Subscription.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Subscription.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }

  Subscription.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    product_id: {
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
    modelName: 'Subscription',
  });

  return Subscription;
};
