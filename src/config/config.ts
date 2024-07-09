import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });

export interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number | string;
  dialect: 'postgres' | 'mysql';
  seederStorage?: string;
}

const config: {
  [key: string]: DBConfig;
} = {
  development: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    port: process.env.DB_PORT!,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  test: {
    username: 'root',
    password: '',
    database: 'database_test',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    port: process.env.DB_PORT!,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
};

export default config;
