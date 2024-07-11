import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  id: number;
  name: string;
  role: 'admin' | 'user' | 'wholeseller';
  email: string;
  password: string;
  phone?: string;
  billing_address?: string;
  shipping_information?: string;
  image?: string;
  google_token?: string;
  stripe_customer_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserModel extends Model<UserAttributes>, UserAttributes {}

export function initUser(sequelize: Sequelize): typeof UserModel;
export default UserModel;
