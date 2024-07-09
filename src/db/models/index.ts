// models/index.ts
import * as fs from 'fs';
import * as path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import config from '../../config/config';

dotenv.config({ path: `${process.cwd()}/.env` });

const basename: string = path.basename(__filename);
const env: string = process.env.NODE_ENV || 'development';
console.log(`Running in environment: ${env}`);

const dbConfig = config[env];

if (!dbConfig) {
  throw new Error(`No config found for environment: ${env}`);
}

console.log(`Loaded config: ${JSON.stringify(dbConfig)}`);

const db: any = {};
let sequelize: Sequelize;

// Initialize Sequelize with direct connection parameters
sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: Number(dbConfig.port),
    dialect: dbConfig.dialect,
    storage: dbConfig.seederStorage,
  }
);

// Import models dynamically
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&  // Adjusted to .ts extension
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file)).default; // Import default export
    db[model.name] = model(sequelize, DataTypes); // Initialize model with sequelize instance
  });

// Apply associations if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Set sequelize and Sequelize objects in db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
