export interface DBConfig {
  development: {
    username: string;
    password: string;
    database: string;
    host: string;
    port: string;
    dialect: string;
    seederStorage: string;
  };
  test: {
    username: string;
    password: string | null;
    database: string;
    host: string;
    dialect: string;
  };
  production: {
    username: string;
    password: string;
    database: string;
    host: string;
    port: string;
    dialect: string;
  };
}
