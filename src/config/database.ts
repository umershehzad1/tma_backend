import { Sequelize } from 'sequelize';
import config, { DBConfig } from './config';

const env: string = process.env.NODE_ENV || 'development';

const dbConfig: DBConfig = config[env as keyof typeof config] as DBConfig;

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port as number,
    dialect: dbConfig.dialect as 'postgres' | 'mysql',
  }
);

export default sequelize;
