// user.ts
import { DataTypes, Model } from 'sequelize';
import { Sequelize } from 'sequelize/types';

interface UserAttributes {
  id: number;
  name: string;
  role: 'admin' | 'user' | 'wholeseller';
  email: string;
  password: string;
  phone: string;
  billing_address: string;
  shipping_information: string;
  image: string;
  google_token: string | null; // Adjusted to string or null
  stripe_customer_id: string | null; // Adjusted to string or null
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public role!: 'admin' | 'user' | 'wholeseller';
  public email!: string;
  public password!: string;
  public phone!: string;
  public billing_address!: string;
  public shipping_information!: string;
  public image!: string;
  public google_token!: string | null;
  public stripe_customer_id!: string | null;

  static associate(models: any) {
    User.hasMany(models.Order, {
      foreignKey: 'user_id'
    });
    // Add other associations as needed
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM('admin', 'user', 'wholeseller'),
    defaultValue: 'user'
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
  phone: DataTypes.STRING,
  billing_address: DataTypes.STRING,
  shipping_information: DataTypes.STRING,
  image: DataTypes.STRING,
  google_token: DataTypes.TEXT,
  stripe_customer_id: DataTypes.STRING
}, {
  sequelize,
  modelName: 'User',
});

export default User;