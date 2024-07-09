import { Model, DataTypes, Sequelize } from 'sequelize';

interface CategoryAttributes {
  id?: number;
  category_name: string;
  category_image: string;
  cloudinary_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
  class Category extends Model<CategoryAttributes> implements CategoryAttributes {
    public id!: number;
    public category_name!: string;
    public category_image!: string;
    public cloudinary_id!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      Category.hasMany(models.Product, {
        foreignKey: 'category_id'
      });
    }
  }

  Category.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cloudinary_id: {
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
    modelName: 'Category',
  });

  return Category;
};
